const { test } = require('node:test');
const assert = require('node:assert/strict');
const { odsViolations, usedComponents } = require('./ods-only');

const clean = `import React from 'react';
import Button from '../../components/button';
import { Stack } from '../../components/layout';
export default function A() { return <Stack><Button size="medium" type="primary" state="enabled" label="Go" /></Stack>; }`;

const check = (source) => odsViolations(source, 'a.tsx');
const body = (jsx) => `export default function A() { return ${jsx}; }`;

test('a clean example has no violations', () => assert.deepEqual(odsViolations(clean, 'a.tsx'), []));

test('usedComponents lists default and named imports, sorted and unique', () => {
  assert.deepEqual(usedComponents(clean), ['Button', 'Stack']);
  const src = `import Zed from '../../components/zed';
import { Alpha, Alpha as Again } from '../../components/alpha';
import Zed2 from '../../components/zed';
import * as All from '../../components/all';
import { Icon } from 'lucide-react';
import type { Tag } from '../../components/tag';`;
  assert.deepEqual(usedComponents(src), ['All', 'Alpha', 'Zed', 'Zed2']);
});

test('reports an import from outside react, lucide-react and ../../components', () => {
  for (const spec of ['next/link', './helper', '../../designTokens', 'oneslash-design-system/components/button',
    '../../components/button.tsx', '../../components/a/b', '../../components', '../components/button']) {
    const out = check(`import X from '${spec}';\nexport const x = X;`);
    assert.equal(out.length, 1, spec);
    assert.match(out[0], /^a\.tsx:1 /, spec);
  }
});

test('allows react, lucide-react and a component import, with or without a use client directive', () => {
  const src = `'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/button';
${body('<Button icon={<Plus />} />')}`;
  assert.deepEqual(check(src), []);
});

test('reports a side-effect import, a re-export, require, and dynamic import', () => {
  assert.equal(check(`import './x.css';`).length, 1);
  assert.equal(check(`export { a } from './other';`).length, 1);
  assert.equal(check(`const a = require('fs');`).length, 1);
  assert.equal(check(`const a = import('./x');`).length, 1);
  assert.equal(check(`import fs = require('fs');`).length, 1);
});

test('reports a lower-case JSX element with its line', () => {
  for (const tag of ['div', 'span', 'form', 'img']) {
    const out = check(`import React from 'react';\n\n${body(`<${tag}>x</${tag}>`)}`);
    assert.equal(out.length, 1, tag);
    assert.match(out[0], /^a\.tsx:3 /, tag);
  }
  assert.equal(check(body('<img src="a" />')).length, 1);
});

test('allows fragments, and member elements whose root is an allowed import', () => {
  const src = `import React from 'react';
import * as Kit from '../../components/kit';
${body('<><React.Fragment><Kit.Card /></React.Fragment></>')}`;
  assert.deepEqual(check(src), []);
});

test('reports member and namespaced elements that resolve to host elements', () => {
  assert.equal(check(body('<foo.bar />')).length, 1);
  assert.equal(check(body('<svg:rect />')).length, 1);
  assert.equal(check(`const foo = {};\n${body('<foo.Bar />')}`).length, 1);
});

test('reports className and style props', () => {
  const src = `import Stack from '../../components/stack';
${body('<Stack\n  className="a"\n  style={{ gap: 1 }}\n/>')}`;
  const out = check(src);
  assert.equal(out.length, 2);
  assert.match(out[0], /^a\.tsx:3 .*className/);
  assert.match(out[1], /^a\.tsx:4 .*style/);
});

test('reports a spread attribute', () => {
  const out = check(`import Stack from '../../components/stack';\n${body('<Stack {...rest} />')}`);
  assert.equal(out.length, 1);
  assert.match(out[0], /^a\.tsx:2 /);
});

test('reports React.createElement and createElement calls', () => {
  assert.equal(check(`import React from 'react';\nconst a = React.createElement('div');`).length, 1);
  assert.equal(check(`import { createElement } from 'react';\nconst a = createElement('div');`).length, 1);
});

test('reports dangerouslySetInnerHTML', () => {
  const out = check(`import Stack from '../../components/stack';\n${body('<Stack dangerouslySetInnerHTML={{ __html: "x" }} />')}`);
  assert.equal(out.length, 1);
  assert.match(out[0], /dangerouslySetInnerHTML/);
});

test('a type-only import is allowed', () => {
  assert.deepEqual(check(`import type { ReactNode } from 'react';\nexport type P = { c: ReactNode };`), []);
});

test('bypass: an aliased createElement import', () => {
  assert.ok(check(`import { createElement as h } from 'react';\nh('div', { className: 'x' });`).length >= 1);
});

test('bypass: element access and detached references on React', () => {
  assert.equal(check(`import React from 'react';\nReact['createElement']('div');`).length, 1);
  assert.ok(check(`import React from 'react';\nconst ce = React.createElement;\nce('div');`).length >= 1);
  assert.equal(check(`import React from 'react';\nconst R = React;`).length, 1);
});

test('bypass: a local string or component used as a tag', () => {
  assert.equal(check(`const Tag = 'div';\n${body('<Tag>x</Tag>')}`).length, 1);
  const out = check(`const Local = () => null;\n${body('<Local />')}`);
  assert.equal(out.length, 1);
  assert.match(out[0], /define no components/);
});

test('bypass: DOM globals, innerHTML and cloneElement', () => {
  assert.ok(check(`document.body.innerHTML = '<b>x</b>';`).length >= 2);
  assert.equal(check(`window.alert(1);`).length, 1);
  assert.equal(check(`const g = globalThis;`).length, 1);
  assert.equal(check(`const a = { outerHTML: 'x' };`).length, 1);
  assert.equal(check(`import React from 'react';\nReact.cloneElement(<></>, { style: {} });`).length, 1);
  assert.equal(check(`import { cloneElement } from 'react';`).length, 1);
});

test('a named react import must be a hook, Fragment or a type', () => {
  assert.equal(check(`import { Children } from 'react';`).length, 1);
  assert.deepEqual(check(`import { useState, useId, Fragment, type ReactNode } from 'react';`), []);
  assert.deepEqual(check(`import { Fragment } from 'react';\n${body('<Fragment>x</Fragment>')}`), []);
});

test('hooks on React and a lucide icon tag pass', () => {
  assert.deepEqual(check(`import React, { useState } from 'react';
import { Plus } from 'lucide-react';
export default function A() { const [a] = useState(0); const [b] = React.useState(1); return <Plus size={a + b} />; }`), []);
});

test('a parse error is reported with its line', () => {
  const out = check(`import Stack from '../../components/stack';\n${body('<Stack>')}`);
  assert.ok(out.length >= 1);
  assert.match(out[0], /^a\.tsx:2 syntax error/);
});
