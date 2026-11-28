// Renders the compiled components (dist/) on the server and checks what an app gets:
// the element, its attributes, and that the icon set stays out of the static import graph.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { Plus } = require('lucide-react');
const { dist, htmlWhenReady } = require('./compile-dist');

const load = (name) => require(path.join(dist, 'components', `${name}.jsx`)).default;
const BrandIcon = load('brandIcon');
const Button = load('button');
const Form = load('form');
const IconButton = load('iconButton');
const ImageEl = load('image');
const Line = load('line');
const Icon = load('icon');
const Tag = load('tag');
const TextField = load('textField');
const Textarea = load('textarea');
const UserImage = load('userImage');
const { Center, Split } = require(path.join(dist, 'components', 'layout.jsx'));

const h = React.createElement;
const html = (element) => renderToStaticMarkup(element);

const base = { size: 'medium', type: 'primary', state: 'enabled', label: 'Save' };
const classOf = (markup) => markup.match(/class="([^"]*)"/)[1].split(/\s+/).filter(Boolean);
const inner = (markup) => markup.replace(/^<[^>]+>/, '').replace(/<\/\w+>$/, '');

test('Button is a <button type="button"> unless told otherwise', () => {
  assert.match(html(h(Button, base)), /^<button type="button"/);
  assert.match(html(h(Button, { ...base, htmlType: 'submit' })), /^<button type="submit"/);
});

test('Button centers a lone label and keeps label and action icon apart', () => {
  assert.ok(classOf(html(h(Button, base))).includes('justify-center'));
  assert.ok(classOf(html(h(Button, { ...base, decoIcon: Plus }))).includes('justify-center'));
  const withAction = classOf(html(h(Button, { ...base, actionIcon: Plus })));
  assert.ok(withAction.includes('justify-between'));
  assert.ok(!withAction.includes('justify-center'));
});

test('Button with href is a link with the same inside and the same look', () => {
  const button = html(h(Button, { ...base, decoIcon: Plus }));
  const link = html(h(Button, { ...base, decoIcon: Plus, href: '/gallery' }));
  assert.match(link, /^<a [^>]*href="\/gallery"/);
  assert.equal(inner(link), inner(button));
  // Only the two classes that depend on the element differ
  const only = (a, b) => a.filter((c) => !b.includes(c));
  assert.deepEqual(only(classOf(button), classOf(link)), ['enabled:active:scale-[0.97]']);
  assert.deepEqual(only(classOf(link), classOf(button)), ['[:where(&amp;)]:w-fit', 'active:scale-[0.97]']);
});

test('Button link: other sites are a plain <a>, a new tab is opt-in, disabled has no href', () => {
  const external = html(h(Button, { ...base, href: 'https://example.com' }));
  assert.match(external, /^<a href="https:\/\/example.com"/);
  assert.doesNotMatch(external, /target=/);
  assert.match(html(h(Button, { ...base, href: 'https://example.com', openInNewTab: true })), /target="_blank" rel="noopener noreferrer"/);
  const disabled = html(h(Button, { ...base, state: 'disabled', href: '/gallery' }));
  assert.match(disabled, /^<a role="link" aria-disabled="true"/);
  assert.doesNotMatch(disabled, /href=/);
});

test('an icon given as a component or an element renders at once, without the icon set', () => {
  assert.match(html(h(Button, { ...base, decoIcon: Plus })), /<svg[^>]*class="lucide lucide-plus w-5 h-5 flex-shrink-0"/);
  assert.match(html(h(Button, { ...base, decoIcon: h('i', { id: 'mark', className: 'size-3' }) })), /<i id="mark" class="size-3"><\/i>/);
  assert.match(html(h(IconButton, { color: 'primary', state: 'enabled', size: 'medium', icon: Plus, ariaLabel: 'Add' })), /^<button [^>]*aria-label="Add"[^>]*><svg[^>]*lucide-plus size-6/);
  assert.match(html(h(Tag, { variant: 'contained', size: 'medium', label: 'New', icon: Plus })), /lucide-plus w-4 h-4/);
  assert.match(html(h(Icon, { icon: Plus, size: 'small' })), /<svg[^>]*width="16" height="16"[^>]*lucide-plus text-fg-primary/);
});

test('an element icon without a class is sized like a component; with a class it is left alone', () => {
  // What a Server Component passes: it cannot hand a component to a client component
  assert.equal(html(h(Button, { ...base, decoIcon: h(Plus) })), html(h(Button, { ...base, decoIcon: Plus })));
  assert.equal(html(h(Button, { ...base, actionIcon: h(Plus) })), html(h(Button, { ...base, actionIcon: Plus })));
  assert.equal(
    html(h(IconButton, { color: 'primary', state: 'enabled', size: 'small', icon: h(Plus), ariaLabel: 'Add' })),
    html(h(IconButton, { color: 'primary', state: 'enabled', size: 'small', icon: Plus, ariaLabel: 'Add' })),
  );
  assert.equal(html(h(Tag, { variant: 'contained', size: 'medium', label: 'New', icon: h(Plus) })), html(h(Tag, { variant: 'contained', size: 'medium', label: 'New', icon: Plus })));
  assert.equal(html(h(Icon, { icon: h(Plus), size: 'small' })), html(h(Icon, { icon: Plus, size: 'small' })));
  // The caller's own size and stroke win; a class that sets no size is kept and the size added
  const own = html(h(Button, { ...base, decoIcon: h(Plus, { className: 'w-8 h-8' }) }));
  assert.match(own, /class="lucide lucide-plus w-8 h-8"/);
  assert.match(html(h(Button, { ...base, decoIcon: h(Plus, { className: 'md:size-8' }) })), /class="lucide lucide-plus md:size-8"/);
  assert.match(html(h(Button, { ...base, decoIcon: h(Plus, { className: 'text-error-main' }) })), /class="lucide lucide-plus text-error-main w-5 h-5 flex-shrink-0"/);
  assert.match(html(h(Button, { ...base, decoIcon: h(Plus, { strokeWidth: 1 }) })), /stroke-width="1"[^>]*class="lucide lucide-plus w-5 h-5 flex-shrink-0"/);
  // A plain tag gets the size class and nothing else
  assert.match(html(h(Button, { ...base, decoIcon: h('i') })), /<i class="w-5 h-5 flex-shrink-0"><\/i>/);
});

test('a Lucide icon a Server Component rendered arrives as an <svg> and is still sized', () => {
  // What crosses from the server: the icon's output, not the icon. Lucide has set its classes and 24px.
  const fromServer = () => h('svg', { className: 'lucide lucide-plus', width: 24, height: 24, strokeWidth: 2, 'aria-hidden': 'true' });
  assert.match(html(h(Button, { ...base, decoIcon: fromServer() })), /class="lucide lucide-plus w-5 h-5 flex-shrink-0"/);
  assert.match(html(h(Button, { ...base, size: 'small', actionIcon: fromServer() })), /class="lucide lucide-plus w-4 h-4 flex-shrink-0"/);
  assert.match(html(h(IconButton, { color: 'tertiary', state: 'enabled', size: 'small', icon: fromServer(), ariaLabel: 'Add' })), /class="lucide lucide-plus size-5"/);
  assert.match(html(h(Tag, { variant: 'contained', size: 'medium', label: 'New', icon: fromServer() })), /class="lucide lucide-plus w-4 h-4 flex-shrink-0"/);
  assert.match(html(h(Icon, { icon: fromServer(), size: 'small' })), /<svg[^>]*class="lucide lucide-plus text-fg-primary"[^>]*width="16" height="16"|<svg[^>]*width="16" height="16"[^>]*class="lucide lucide-plus text-fg-primary"/);
});

test('an icon given by name still renders, and is the same icon', async () => {
  // First use of a name: until the icon set has loaded, a box of the icon's size holds its place
  assert.match(html(h(Button, { ...base, decoIcon: 'Plus' })), /<span aria-hidden="true" class="inline-block w-5 h-5 flex-shrink-0"><\/span>/);
  const strip = (s) => s.replace(/<!--.*?-->/g, '');
  assert.equal(strip(await htmlWhenReady(h(Button, { ...base, decoIcon: 'Plus' }))), html(h(Button, { ...base, decoIcon: Plus })));
  assert.equal(
    strip(await htmlWhenReady(h(IconButton, { color: 'primary', state: 'enabled', size: 'medium', iconName: 'Plus' }))),
    html(h(IconButton, { color: 'primary', state: 'enabled', size: 'medium', icon: Plus, ariaLabel: 'Plus' })),
  );
  assert.equal(strip(await htmlWhenReady(h(Icon, { name: 'Plus' }))), html(h(Icon, { icon: Plus })));
});

test('IconButton with href is a link named by its label', () => {
  const link = html(h(IconButton, { color: 'tertiary', state: 'enabled', size: 'small', icon: Plus, ariaLabel: 'Add', href: '/new' }));
  assert.match(link, /^<a [^>]*href="\/new"/);
  assert.match(link, /aria-label="Add"/);
  assert.ok(classOf(link).includes('hover:bg-background-accent200/75'));
  assert.ok(!classOf(link).some((c) => c.startsWith('enabled:')));
});

test('only namedIcon imports the whole icon set, and only iconSlot loads it, lazily', () => {
  const dir = path.join(dist, 'components');
  const wholeSet = /import\s+\*\s+as\s+\w+\s+from\s+['"]lucide-react['"]|import\s*\{[^}]*\bicons\b[^}]*\}\s*from\s+['"]lucide-react['"]/;
  for (const file of fs.readdirSync(dir).filter((f) => /\.jsx?$/.test(f))) {
    const source = fs.readFileSync(path.join(dir, file), 'utf8');
    if (file === 'namedIcon.jsx') {
      assert.match(source, wholeSet);
      continue;
    }
    assert.doesNotMatch(source, wholeSet, `${file} imports the whole icon set`);
    assert.doesNotMatch(source, /from\s+['"]\.\/namedIcon['"]/, `${file} imports namedIcon statically`);
    if (file === 'iconSlot.jsx') assert.match(source, /import\(['"]\.\/namedIcon['"]\)/);
    else assert.doesNotMatch(source, /namedIcon/, `${file} reaches namedIcon without iconSlot`);
  }
});

test('TextField and Textarea pass length limits and spellCheck to the element', () => {
  const field = { id: 'f', value: '', onChange() {} };
  const input = html(h(TextField, { ...field, maxLength: 20, minLength: 3, spellCheck: false }));
  assert.match(input, /<input [^>]*maxLength="20"[^>]*minLength="3"[^>]*spellCheck="false"/i);
  const multiline = html(h(TextField, { ...field, multiline: true, maxLength: 20, minLength: 3, spellCheck: false }));
  assert.match(multiline, /<textarea [^>]*maxLength="20"[^>]*minLength="3"[^>]*spellCheck="false"/i);
  assert.match(html(h(Textarea, { ...field, maxLength: 280, spellCheck: false })), /<textarea [^>]*maxLength="280"[^>]*spellCheck="false"/i);
  // Not set, not rendered
  assert.doesNotMatch(html(h(TextField, field)), /maxLength|minLength|spellCheck/i);
  assert.doesNotMatch(html(h(Textarea, field)), /maxLength|spellCheck/i);
});

test('UserImage takes a size and a referrerPolicy', () => {
  const plain = html(h(UserImage, { userHandle: 'Alice' }));
  assert.match(plain, /w-6 h-6/);
  assert.doesNotMatch(plain, /width:/);
  assert.match(html(h(UserImage, { userHandle: 'Alice', size: 48 })), /width:48px;height:48px;font-size:32px/);
  const photo = html(h(UserImage, { userHandle: 'Alice', userImgUrl: 'https://example.com/a.png', referrerPolicy: 'no-referrer' }));
  assert.match(photo, /<img [^>]*referrerPolicy="no-referrer"/);
  assert.doesNotMatch(html(h(UserImage, { userHandle: 'Alice', userImgUrl: 'https://example.com/a.png' })), /referrerPolicy/i);
});

test('every file dist/index.js imports is in dist', () => {
  const source = fs.readFileSync(path.join(dist, 'index.js'), 'utf8');
  const specifiers = [...source.matchAll(/(?:from|import)\s+['"](\.[^'"]+)['"]/g)].map((m) => m[1]);
  assert.ok(specifiers.length > 10);
  for (const spec of specifiers) {
    const file = path.join(dist, spec);
    const found = ['', '.js', '.jsx'].some((ext) => fs.existsSync(file + ext) && fs.statSync(file + ext).isFile());
    assert.ok(found, `dist/index.js imports ${spec}, which is not in dist`);
  }
});

test('Form renders a <form> and submits without a page load', () => {
  assert.match(html(h(Form, { onSubmit() {}, children: 'x' })), /^<form novalidate=""/i);
});
test('Line with a label renders the label between two lines', () => {
  const out = html(h(Line, { label: 'or' }));
  assert.equal(out.match(/bg-misc-divider/g).length, 2);
  assert.match(out, />or</);
});
test('Line without a label is unchanged', () => assert.equal(html(h(Line, {})), '<div class="bg-misc-divider h-px w-full "></div>'));
test('Form is a client component', () => {
  const first = fs.readFileSync(path.join(dist, 'components', 'form.jsx'), 'utf8').split('\n')[0];
  assert.match(first, /^['"]use client['"];?$/);
});

test('Center is a centered column at the form width by default', () => {
  const c = classOf(html(h(Center, { children: 'x' })));
  for (const k of ['mx-auto', 'w-full', 'max-w-form', 'px-xlarge', 'gap-xlarge']) assert.ok(c.includes(k), k);
  assert.ok(!c.includes('min-h-screen'));
});
test('Center takes the page width, and with fill the window height', () => {
  assert.ok(classOf(html(h(Center, { width: 'page', children: 'x' }))).includes('max-w-page'));
  const outer = classOf(html(h(Center, { fill: true, children: 'x' })));
  for (const k of ['min-h-screen', 'justify-center']) assert.ok(outer.includes(k), k);
});
test('Split shows the aside only from md up', () => {
  const out = html(h(Split, { aside: 'A', children: 'B' }));
  assert.match(out, /hidden md:flex[^"]*"[^>]*>A</);
  assert.match(out, /md:grid-cols-2/);
  assert.match(out, /bg-background-panel/);
  assert.match(out, />B</);
  assert.ok(!classOf(out).includes('min-h-screen'));
  assert.ok(classOf(html(h(Split, { aside: 'A', fill: true, children: 'B' }))).includes('min-h-screen'));
});

test('Image renders an <img> with alt, width and height', () => {
  assert.match(html(h(ImageEl, { src: '/a.png', alt: 'A', width: 40, height: 20 })), /^<img [^>]*alt="A"[^>]*width="40"[^>]*height="20"/);
  assert.match(html(h(ImageEl, { src: '/a.png', alt: '' })), /alt=""/);
  assert.match(html(h(ImageEl, { src: '/a.png', alt: 'A', fit: 'contain', loading: 'lazy' })), /class="object-contain"/);
  assert.match(html(h(ImageEl, { src: '/a.png', alt: 'A', loading: 'lazy' })), /loading="lazy"/);
  assert.doesNotMatch(html(h(ImageEl, { src: '/a.png', alt: 'A' })), /class=|loading=|width=/);
});
test('BrandIcon is hidden from assistive tech unless it has a title', () => {
  assert.match(html(h(BrandIcon, { name: 'github' })), /aria-hidden="true"/);
  const named = html(h(BrandIcon, { name: 'github', title: 'GitHub' }));
  assert.match(named, /<title>GitHub<\/title>/);
  assert.match(named, /role="img"/);
  assert.doesNotMatch(named, /aria-hidden/);
});
test('BrandIcon github and apple draw in currentColor; google keeps its four colors', () => {
  for (const name of ['github', 'apple']) {
    const out = html(h(BrandIcon, { name }));
    assert.equal(out.match(/<path /g).length, 1);
    assert.match(out, /fill="currentColor"/);
  }
  const google = html(h(BrandIcon, { name: 'google' }));
  assert.equal(google.match(/<path /g).length, 4);
  for (const c of ['#4285F4', '#34A853', '#FBBC05', '#EA4335']) assert.ok(google.includes(c), c);
  assert.doesNotMatch(google, /currentColor/);
});
test('BrandIcon takes size, or a size class, and ignores props it does not use', () => {
  assert.match(html(h(BrandIcon, { name: 'apple' })), /^<svg [^>]*width="16" height="16"/);
  assert.match(html(h(BrandIcon, { name: 'apple', size: 24 })), /width="24" height="24"/);
  const byClass = html(h(BrandIcon, { name: 'apple', className: 'w-5 h-5' }));
  assert.match(byClass, /class="w-5 h-5"/);
  assert.doesNotMatch(byClass, /width=|height=/);
  assert.doesNotMatch(html(h(BrandIcon, { name: 'apple', strokeWidth: 2 })), /stroke/i);
});
test('a Button takes a BrandIcon as its decoIcon and sizes it like a named icon', () => {
  const brand = html(h(Button, { ...base, decoIcon: h(BrandIcon, { name: 'github' }) }));
  const lucide = html(h(Button, { ...base, decoIcon: h(Plus) }));
  assert.equal(brand.match(/<svg /g).length, 1);
  const sizeOf = (m) => m.match(/<svg [^>]*class="([^"]*)"/)[1].split(/\s+/).filter((c) => /^(w|h)-/.test(c));
  assert.deepEqual(sizeOf(brand), sizeOf(lucide));
  assert.doesNotMatch(brand, /<svg [^>]*(width|height|stroke)/i);
});

// React 18 logs through console.error when a server render runs into something it cannot do, such as useLayoutEffect
test('TabsContainer and Tooltip render on the server without a console.error', async () => {
  const TabsContainer = load('tabsContainer');
  const Tab = load('tab');
  const Tooltip = load('tooltip');
  const errors = [];
  const original = console.error;
  console.error = (...args) => errors.push(args.join(' '));
  try {
    await htmlWhenReady(h(TabsContainer, null, h(Tab, { label: 'One', isSelected: true, onClickTab: () => {} })));
    await htmlWhenReady(h(Tooltip, { title: 'Hint' }, h('span', null, 'Hover')));
  } finally {
    console.error = original;
  }
  assert.deepEqual(errors, []);
});

// Output captured before heading level 1, TabsContainer fill and TextField readOnly existed.
// Without the new props the markup must stay byte for byte the same.
const before = {
 "heading": "<h3 class=\"text-h6 text-fg-primary \">Hi</h3>",
 "heading2": "<h2 class=\"text-h4 text-fg-primary \">Hi</h2>",
 "tabs": "<div role=\"tablist\" class=\"\n          relative flex gap-0.5 p-1 rounded-container overflow-x-auto\n          bg-background-accent100\n        \" style=\"scrollbar-width:none;-ms-overflow-style:none\"><div data-tab-selected=\"true\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\" class=\"\n        relative flex items-center space-x-1 rounded-control cursor-pointer justify-start transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary\n        py-1 px-[6px]\n        text-primary-contrast\n      \"><div class=\"flex flex-col text-center px-[6px] text-body1\"><span class=\"whitespace-nowrap\">A</span></div></div><div data-tab-selected=\"false\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\" class=\"\n        relative flex items-center space-x-1 rounded-control cursor-pointer justify-start transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary\n        py-1 px-[6px]\n        text-fg-primary hover:bg-background-accent200\n      \"><div class=\"flex flex-col text-center px-[6px] text-body1\"><span class=\"whitespace-nowrap\">B</span></div></div></div>",
 "tf": "<div class=\"flex flex-col w-full\"><label for=\"f\" class=\"mb-1 text-body2 text-fg-secondary\">L</label><div class=\"relative\"><input id=\"f\" type=\"text\" class=\"\n    bg-background-default text-fg-primary\n    w-full border rounded-control outline-none transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none\n    placeholder:text-fg-disabled\n    text-body1 p-2 leading-[22px]\n    border-fg-disabled\n      hover:border-fg-secondary\n      focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-fg-primary\n  \" autoComplete=\"off\" value=\"v\"/></div></div>",
 "tfm": "<div class=\"flex flex-col w-full\"><label for=\"f\" class=\"mb-1 text-body2 text-fg-secondary\">L</label><div class=\"relative\"><textarea id=\"f\" rows=\"6\" class=\"\n    bg-background-default text-fg-primary\n    w-full border rounded-control outline-none transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none\n    placeholder:text-fg-disabled\n    text-body1 p-2 leading-[22px]\n    border-fg-disabled\n      hover:border-fg-secondary\n      focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-fg-primary\n  \" autoComplete=\"off\">v</textarea></div></div>",
 "tfd": "<div class=\"flex flex-col w-full\"><label for=\"f\" class=\"mb-1 text-body2 text-fg-secondary\">L</label><div class=\"relative\"><input id=\"f\" type=\"text\" class=\"\n    bg-transparent text-fg-disabled cursor-not-allowed\n    w-full border rounded-control outline-none transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none\n    placeholder:text-fg-disabled\n    text-body1 p-2 leading-[22px]\n    border-fg-disabled\n  \" disabled=\"\" autoComplete=\"off\" value=\"v\"/></div></div>"
};

test('Heading, TabsContainer and TextField render unchanged without the new props', () => {
  const Heading = load('heading');
  const TabsContainer = load('tabsContainer');
  const Tab = load('tab');
  const f = { id: 'f', label: 'L', value: 'v', onChange() {} };
  const tab = (label, isSelected) => h(Tab, { label, isSelected, onClickTab() {} });
  assert.equal(html(h(Heading, null, 'Hi')), before.heading);
  assert.equal(html(h(Heading, { level: 2, size: 'h4' }, 'Hi')), before.heading2);
  assert.equal(html(h(TabsContainer, null, tab('A', true), tab('B', false))), before.tabs);
  assert.equal(html(h(TextField, f)), before.tf);
  assert.equal(html(h(TextField, { ...f, multiline: true })), before.tfm);
  assert.equal(html(h(TextField, { ...f, disabled: true })), before.tfd);
});

test('Heading level 1 is an <h1>', () => {
  const Heading = load('heading');
  assert.match(html(h(Heading, { level: 1, size: 'h4' }, 'Hi')), /^<h1 /);
  assert.match(html(h(Heading, null, 'Hi')), /^<h3 /);
});

test('TabsContainer fill: full-width container, every tab grows equally and centers its label', () => {
  const TabsContainer = load('tabsContainer');
  const Tab = load('tab');
  const tab = (label, isSelected) => h(Tab, { label, isSelected, onClickTab() {} });
  const markup = html(h(TabsContainer, { fill: true }, tab('Log In', true), tab('Sign Up', false)));
  assert.ok(classOf(markup).includes('w-full'));
  const tabs = markup.split('role="tab"').slice(1).map((s) => s.match(/class="([^"]*)"/)[1].split(/\s+/));
  assert.equal(tabs.length, 2);
  for (const classes of tabs) {
    assert.ok(classes.includes('flex-1'));
    assert.ok(classes.includes('justify-center'));
    assert.ok(!classes.includes('justify-start'));
  }
  // Not filled: neither the container nor a tab grows
  const plain = html(h(TabsContainer, null, tab('Log In', true)));
  assert.ok(!classOf(plain).includes('w-full'));
  assert.doesNotMatch(plain, /flex-1/);
});

test('TextField readOnly reaches the element and keeps the normal colors', () => {
  const field = { id: 'f', value: 'v', onChange() {} };
  const input = html(h(TextField, { ...field, readOnly: true }));
  assert.match(input, /<input [^>]*readOnly=""/i);
  assert.match(html(h(TextField, { ...field, readOnly: true, multiline: true })), /<textarea [^>]*readOnly=""/i);
  assert.doesNotMatch(input, /disabled=|cursor-not-allowed|bg-transparent/);
  const inputClasses = input.match(/<input [^>]*class="([^"]*)"/)[1].split(/\s+/);
  assert.ok(inputClasses.includes('text-fg-primary'));
  assert.ok(inputClasses.includes('bg-background-default'));
  assert.ok(!inputClasses.includes('text-fg-disabled'));
  assert.doesNotMatch(html(h(TextField, field)), /readOnly/i);
});
