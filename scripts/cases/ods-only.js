// Checks that a case example is built from ODS only, and lists the components it imports.
const ts = require('typescript');

const COMPONENT_IMPORT = /^\.\.\/\.\.\/components\/[A-Za-z0-9_-]+$/;
const isAllowedModule = (spec) => spec === 'react' || spec === 'lucide-react' || COMPONENT_IMPORT.test(spec);
const FORBIDDEN_PROPS = new Set(['className', 'style', 'dangerouslySetInnerHTML']);

function parse(source, fileName) {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

const isHookOrFragment = (name) => name === 'Fragment' || /^use/.test(name);
const BROWSER_GLOBALS = new Set(['document', 'window', 'globalThis']);
const HTML_PROPS = new Set(['innerHTML', 'outerHTML']);

// Sorts the file's imports into: names usable as JSX tags (component and lucide
// imports), React default/namespace bindings, and Fragment imported from react.
function importedBindings(sf) {
  const tags = new Set();
  const react = new Set();
  const fragments = new Set();
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier) || !st.importClause) continue;
    const spec = st.moduleSpecifier.text;
    const clause = st.importClause;
    const nb = clause.namedBindings;
    if (spec === 'react') {
      if (clause.name) react.add(clause.name.text);
      if (nb && ts.isNamespaceImport(nb)) react.add(nb.name.text);
      if (nb && ts.isNamedImports(nb)) {
        nb.elements.forEach((el) => { if ((el.propertyName || el.name).text === 'Fragment') fragments.add(el.name.text); });
      }
    } else if (spec === 'lucide-react' || COMPONENT_IMPORT.test(spec)) {
      if (clause.name) tags.add(clause.name.text);
      if (nb && ts.isNamespaceImport(nb)) tags.add(nb.name.text);
      if (nb && ts.isNamedImports(nb)) nb.elements.forEach((el) => tags.add(el.name.text));
    }
  }
  return { tags, react, fragments };
}

function odsViolations(source, fileName) {
  const sf = parse(source, fileName);
  const { tags, react, fragments } = importedBindings(sf);
  const out = [];
  const reportAt = (pos, what) => {
    out.push(`${fileName}:${sf.getLineAndCharacterOfPosition(pos).line + 1} ${what}`);
  };
  const report = (node, what) => reportAt(node.getStart(sf), what);

  for (const d of sf.parseDiagnostics || []) {
    reportAt(d.start || 0, `syntax error: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`);
  }

  const checkModule = (node, spec) => {
    if (!isAllowedModule(spec)) report(node, `import from "${spec}" is not react, lucide-react or ../../components/<name>`);
  };

  const checkReactImport = (st) => {
    const clause = st.importClause;
    if (!clause || clause.isTypeOnly || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) return;
    for (const el of clause.namedBindings.elements) {
      const name = (el.propertyName || el.name).text;
      if (!el.isTypeOnly && !isHookOrFragment(name)) report(el, `react import "${name}" is not allowed; only hooks and Fragment`);
    }
  };

  const checkTag = (tag) => {
    if (ts.isIdentifier(tag)) {
      if (tags.has(tag.text) || fragments.has(tag.text)) return;
      if (/^[a-z]/.test(tag.text)) report(tag, `lower-case element <${tag.text}> is not an ODS component`);
      else report(tag, `element <${tag.text}> is not imported from ODS; define no components inside an example`);
    } else if (ts.isPropertyAccessExpression(tag)) {
      if (ts.isIdentifier(tag.expression)) {
        const root = tag.expression.text;
        if (tags.has(root)) return;
        if (react.has(root) && tag.name.text === 'Fragment') return;
      } else {
        let root = tag.expression;
        while (ts.isPropertyAccessExpression(root)) root = root.expression;
        if (ts.isIdentifier(root) && tags.has(root.text)) return;
      }
      report(tag, `element <${tag.getText(sf)}> does not come from an allowed import`);
    } else {
      report(tag, `element <${tag.getText(sf)}> is not an ODS component`);
    }
  };

  const checkReactAccess = (node, prop) => {
    if (!isHookOrFragment(prop)) report(node, `React.${prop} is not allowed; only hooks and Fragment`);
  };

  const visit = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      checkModule(node, node.moduleSpecifier.text);
      if (node.moduleSpecifier.text === 'react') checkReactImport(node);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      checkModule(node, node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      report(node, 'import = require(...) is not allowed');
    } else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (callee.kind === ts.SyntaxKind.ImportKeyword) report(node, 'dynamic import() is not allowed');
      else if (ts.isIdentifier(callee) && callee.text === 'require') report(node, 'require() is not allowed');
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      checkTag(node.tagName);
    } else if (ts.isJsxAttribute(node)) {
      const name = ts.isIdentifier(node.name) ? node.name.text : node.name.getText(sf);
      if (FORBIDDEN_PROPS.has(name)) report(node, `the ${name} prop is not allowed`);
    } else if (ts.isJsxSpreadAttribute(node)) {
      report(node, 'a spread attribute is not allowed');
    } else if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && react.has(node.expression.text)) {
      checkReactAccess(node, node.name.text);
    } else if (ts.isElementAccessExpression(node)) {
      const arg = node.argumentExpression;
      if (ts.isIdentifier(node.expression) && react.has(node.expression.text)) {
        if (ts.isStringLiteralLike(arg)) checkReactAccess(node, arg.text);
        else report(node, 'computed access on React is not allowed');
      }
      if (ts.isStringLiteralLike(arg) && HTML_PROPS.has(arg.text)) report(node, `${arg.text} is not allowed`);
    } else if (ts.isIdentifier(node)) {
      const parent = node.parent;
      const isPropName = parent && ts.isPropertyAccessExpression(parent) && parent.name === node;
      if (isPropName && HTML_PROPS.has(node.text)) report(node, `${node.text} is not allowed`);
      else if (!isPropName && BROWSER_GLOBALS.has(node.text)) report(node, `${node.text} is not allowed`);
      else if (parent && ts.isPropertyAssignment(parent) && parent.name === node && HTML_PROPS.has(node.text)) report(node, `${node.text} is not allowed`);
      else if (!isPropName && react.has(node.text) && parent
        && !(ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) // checked above
        && !ts.isQualifiedName(parent) && !ts.isImportClause(parent) && !ts.isNamespaceImport(parent)) {
        report(node, `${node.text} may only be used as ${node.text}.Fragment or a hook`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

function usedComponents(source) {
  const sf = parse(source, 'example.tsx');
  const names = new Set();
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier) || !COMPONENT_IMPORT.test(st.moduleSpecifier.text)) continue;
    const clause = st.importClause;
    if (!clause || clause.isTypeOnly) continue;
    if (clause.name) names.add(clause.name.text);
    const nb = clause.namedBindings;
    if (nb && ts.isNamespaceImport(nb)) names.add(nb.name.text);
    if (nb && ts.isNamedImports(nb)) {
      nb.elements.filter((el) => !el.isTypeOnly).forEach((el) => names.add((el.propertyName || el.name).text));
    }
  }
  return [...names].sort();
}

module.exports = { odsViolations, usedComponents };
