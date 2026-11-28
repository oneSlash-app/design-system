// Turns loaded cases into the published files: cases.json, one markdown file per case,
// the DESIGN.md Cases section and the Storybook file that shows every example.
const { cell } = require('../tokens/emit-design-md');

const products = (c) => [...new Set(c.seenIn.map((s) => s.product))].sort();
const oneLine = (v) => String(v).replace(/\s*[\r\n]+\s*/g, ' ');
const bullets = (items) => items.map((i) => `- ${i}`).join('\n');
const isRule = (c) => c.kind === 'rule';
const notBuilt = (c) => (c.notBuiltYet ? [`**Not built yet:** ${c.notBuiltYet}`] : []);

// Published examples import from the package; the files in cases/ import relative paths.
const publishedSource = (source) => source.replace(
  /(from\s+)(['"])\.\.\/\.\.\/components\/([^'"]+)\2/g, '$1$2oneslash-design-system/components/$3$2');

const CASE_FIELDS = ['id', 'title', 'kind', 'level', 'area', 'situation', 'answer', 'why', 'do', 'dont', 'native', 'notBuiltYet'];
const OPTION_FIELDS = ['id', 'title', 'useWhen', 'do', 'dont'];
const pick = (from, keys) => Object.fromEntries(keys.filter((k) => from[k] !== undefined).map((k) => [k, from[k]]));

function jsonOption(o) {
  const out = pick(o, OPTION_FIELDS);
  if (o.source !== undefined) out.source = publishedSource(o.source);
  if (o.uses !== undefined) out.uses = o.uses;
  return out;
}

function emitCasesJson(cases) {
  const out = cases.map((c) => {
    const json = { ...pick(c, CASE_FIELDS), seenIn: products(c) };
    if (c.options !== undefined) json.options = c.options.map(jsonOption);
    return json;
  });
  return `${JSON.stringify({ cases: out }, null, 2)}\n`;
}

// A one-option case has nothing to choose between, so its file leaves out "Use when"
function emitOption(o, label, showUseWhen) {
  const parts = [`## ${label}: ${o.title}`];
  if (showUseWhen) parts.push(`Use when: ${o.useWhen}`);
  if (o.do && o.do.length) parts.push(`Do:\n${bullets(o.do)}`);
  if (o.dont && o.dont.length) parts.push(`Don't:\n${bullets(o.dont)}`);
  parts.push(`Uses: ${o.uses.map((u) => `\`${u}\``).join(', ')}`);
  parts.push(`\`\`\`tsx\n${publishedSource(o.source).replace(/\n$/, '')}\n\`\`\``);
  return parts.join('\n\n');
}

function emitCaseMd(c) {
  const parts = [`# ${c.title}`, c.situation];
  if (isRule(c)) {
    parts.push(`## Answer\n\n${c.answer}`, ...notBuilt(c), `## Why\n\n${c.why}`, `## Do\n\n${bullets(c.do)}`, `## Don't\n\n${bullets(c.dont)}`);
  } else {
    parts.push(...notBuilt(c));
    if (c.do && c.do.length) parts.push(`## Do\n\n${bullets(c.do)}`);
    if (c.dont && c.dont.length) parts.push(`## Don't\n\n${bullets(c.dont)}`);
    const one = c.options.length === 1;
    parts.push(...c.options.map((o) => emitOption(o, one ? 'Example' : 'Option', !one)));
  }
  if (c.native) parts.push(`## Native\n\n${c.native}`);
  parts.push(`Seen in: ${products(c).join(', ')}.`);
  return `${parts.join('\n\n')}\n`;
}

// Each rule's answer and its file, then one table row per design case.
function emitCasesSection(cases) {
  const rules = cases.filter(isRule);
  const designs = cases.filter((c) => !isRule(c));
  if (rules.length === 0 && designs.length === 0) return 'There are no design cases yet.';
  const parts = rules.map((c) => [
    `### ${c.title}`, c.situation, `Answer: ${c.answer}`, ...notBuilt(c), `File: cases/${c.id}.md`,
  ].join('\n\n'));
  if (designs.length > 0) {
    const row = (cells) => `| ${cells.map((v) => cell(oneLine(v))).join(' | ')} |`;
    parts.push([
      row(['Case', 'When', 'File']), row(['---', '---', '---']),
      ...designs.map((c) => row([c.title, c.situation, `cases/${c.id}.md`])),
    ].join('\n'));
  }
  return parts.join('\n\n');
}

const pascal = (id) => id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
// An identifier may not start with a digit.
const ident = (s) => (/^\d/.test(s) ? `_${s}` : s);

function emitCaseStories(cases) {
  const header = '// Generated from cases/ by npm run build. Do not edit.';
  const examples = cases.filter((c) => !isRule(c)).flatMap((c) => c.options.map((o) => ({
    name: ident(`${pascal(c.id)}_${pascal(o.id)}`), from: `../cases/${c.id}/${o.id}`,
  })));
  const lines = [header, 'import React from "react";', 'import type { Meta, StoryObj } from "@storybook/react";'];
  if (examples.length === 0) {
    lines.push('import EmptyBox from "../components/emptyBox";', '',
      'const meta: Meta = { title: "Cases" };', 'export default meta;', 'type Story = StoryObj;', '',
      'export const NoCases: Story = { render: () => <EmptyBox text="No design cases yet" size="small" /> };');
  } else {
    lines.push(...examples.map((e) => `import ${e.name}Example from "${e.from}";`), '',
      'const meta: Meta = { title: "Cases" };', 'export default meta;', 'type Story = StoryObj;', '',
      ...examples.map((e) => `export const ${e.name}: Story = { render: () => <${e.name}Example /> };`));
  }
  return `${lines.join('\n')}\n`;
}

module.exports = { emitCasesJson, emitCaseMd, emitCasesSection, emitCaseStories };
