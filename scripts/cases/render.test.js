// Renders every compiled design case example (dist/cases/<id>/<option>.jsx) on the server.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { dist, htmlWhenReady } = require('../compile-dist');

const h = React.createElement;
const { cases } = JSON.parse(fs.readFileSync(path.join(dist, 'cases.json'), 'utf8'));

for (const c of cases) {
  for (const o of c.options || []) {
    test(`${c.id}/${o.id} renders on the server`, async () => {
      const Example = require(path.join(dist, 'cases', c.id, `${o.id}.jsx`)).default;
      const out = await htmlWhenReady(h(Example));
      assert.ok(out.length > 200);
    });
  }
}

test('there is at least one design case', () => {
  assert.ok(cases.some((c) => (c.options || []).length > 0));
});
