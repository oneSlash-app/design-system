// dist/ is ESM with JSX left in (.jsx), for the app's bundler. Requiring this file makes Node
// compile it to CommonJS on require, so tests can render what an app gets.
const fs = require('node:fs');
const path = require('node:path');
const { Writable } = require('node:stream');
const ts = require('typescript');
const { renderToPipeableStream } = require('react-dom/server');

const dist = path.join(__dirname, '..', 'dist');

// The automatic JSX runtime, as Next.js and Vite use: a case example does not import React.
const compile = (module, file) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  module._compile(outputText, file);
};
require.extensions['.jsx'] = compile;
const defaultJs = require.extensions['.js'];
require.extensions['.js'] = (module, file) => (file.startsWith(dist + path.sep) ? compile(module, file) : defaultJs(module, file));

// Waits for lazy parts (an icon looked up by name), as a streaming server render does
const htmlWhenReady = (element) =>
  new Promise((resolve, reject) => {
    let out = '';
    const sink = new Writable({
      write(chunk, _enc, done) {
        out += chunk;
        done();
      },
      final(done) {
        resolve(out);
        done();
      },
    });
    const stream = renderToPipeableStream(element, { onAllReady: () => stream.pipe(sink), onError: reject });
  });

module.exports = { dist, htmlWhenReady };
