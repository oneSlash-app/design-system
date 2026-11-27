// Checks that a case example is built from ODS only, and lists the components it imports.
const ts = require('typescript');

const COMPONENT_IMPORT = /^\.\.\/\.\.\/components\/[A-Za-z0-9_-]+$/;
const isAllowedModule = (spec) => spec === 'react' || spec === 'lucide-react' || COMPONENT_IMPORT.test(spec);
const FORBIDDEN_PROPS = new Set(['className', 'style', 'dangerouslySetInnerHTML']);

function parse(source, fileName) {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

// Names bound by an import of an allowed module (used to accept <Kit.Card>).
function importedBindings(sf) {
  const names = new Set();
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier) || !isAllowedModule(st.moduleSpecifier.text)) continue;
    const clause = st.importClause;
    if (!clause) continue;
    if (clause.name) names.add(clause.name.text);
    const nb = clause.namedBindings;
    if (nb && ts.isNamespaceImport(nb)) names.add(nb.name.text);
    if (nb && ts.isNamedImports(nb)) nb.elements.forEach((el) => names.add(el.name.text));
  }
  return names;
}

function odsViolations(source, fileName) {
  const sf = parse(source, fileName);
  const bound = importedBindings(sf);
  const out = [];
  const report = (node, what) => {
    out.push(`${fileName}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1} ${what}`);
  };

  const checkModule = (node, spec) => {
    if (!isAllowedModule(spec)) report(node, `import from "${spec}" is not react, lucide-react or ../../components/<name>`);
  };

  const checkTag = (tag) => {
    if (ts.isIdentifier(tag)) {
      if (/^[a-z]/.test(tag.text)) report(tag, `lower-case element <${tag.text}> is not an ODS component`);
    } else if (ts.isPropertyAccessExpression(tag)) {
      let root = tag;
      while (ts.isPropertyAccessExpression(root)) root = root.expression;
      if (!ts.isIdentifier(root) || !bound.has(root.text)) report(tag, `element <${tag.getText(sf)}> does not come from an allowed import`);
    } else {
      report(tag, `element <${tag.getText(sf)}> is not an ODS component`);
    }
  };

  const visit = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      checkModule(node, node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      checkModule(node, node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      report(node, 'import = require(...) is not allowed');
    } else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (callee.kind === ts.SyntaxKind.ImportKeyword) report(node, 'dynamic import() is not allowed');
      else if (ts.isIdentifier(callee) && callee.text === 'require') report(node, 'require() is not allowed');
      else if (ts.isIdentifier(callee) && callee.text === 'createElement') report(node, 'createElement is not allowed');
      else if (ts.isPropertyAccessExpression(callee) && callee.name.text === 'createElement') report(node, 'createElement is not allowed');
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      checkTag(node.tagName);
    } else if (ts.isJsxAttribute(node)) {
      const name = ts.isIdentifier(node.name) ? node.name.text : node.name.getText(sf);
      if (FORBIDDEN_PROPS.has(name)) report(node, `the ${name} prop is not allowed`);
    } else if (ts.isJsxSpreadAttribute(node)) {
      report(node, 'a spread attribute is not allowed');
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
