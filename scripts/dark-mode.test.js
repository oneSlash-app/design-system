const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// dist/ is ESM and the package is not "type": "module", so Node 20 cannot
// require() or import() it. Re-emit the compiled file as CommonJS in memory.
function loadDistAsCjs(rel) {
  const file = path.join(__dirname, '..', rel);
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const m = new Module(file, module);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  m._compile(outputText, file);
  return m.exports;
}

const { resolveDarkMode } = loadDistAsCjs('dist/components/useDarkMode.js');
const cl = (...c) => ({ contains: x => c.includes(x) });

test('resolveDarkMode', () => {
  assert.equal(resolveDarkMode(cl('dark'), false), true);
  assert.equal(resolveDarkMode(cl('light'), true), false);
  assert.equal(resolveDarkMode(cl(), true), true);
  assert.equal(resolveDarkMode(cl(), false), false);
});
