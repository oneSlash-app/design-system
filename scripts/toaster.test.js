// The toast store's pure helpers, from the compiled dist/components/toaster.jsx.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { dist } = require('./compile-dist');

const file = path.join(dist, 'components', 'toaster.jsx');
const { addToast, removeToast, visibleToasts } = require(file);

const four = () => ['a', 'b', 'c', 'd'].reduce((s, id) => addToast(s, `Toast ${id}`, id), []);

test('addToast puts the newest first', () => {
  const state = addToast(addToast([], 'First', 'one'), 'Second', 'two');
  assert.deepEqual(state.map((t) => t.id), ['two', 'one']);
});

test('visibleToasts shows at most 3; the fourth appears after one is removed', () => {
  const state = four();
  assert.equal(visibleToasts(state).length, 3);
  assert.ok(!visibleToasts(state).some((t) => t.id === 'd'));
  assert.ok(visibleToasts(removeToast(state, 'b')).some((t) => t.id === 'd'));
  // Newest on top among the visible ones
  assert.deepEqual(visibleToasts(state).map((t) => t.id), ['c', 'b', 'a']);
});

test('an error stays until closed; other types last 5 seconds', () => {
  assert.equal(addToast([], { type: 'error', message: 'Failed' }, 'e')[0].duration, null);
  assert.equal(addToast([], { type: 'success', message: 'Saved' }, 's')[0].duration, 5000);
  assert.equal(addToast([], { type: 'error', message: 'Failed', duration: 2000 }, 'e')[0].duration, 2000);
});

test('a string becomes a default toast', () => {
  assert.deepEqual(addToast([], 'Saved', 'x')[0], { id: 'x', type: 'default', message: 'Saved', secondMessage: undefined, duration: 5000 });
});

test('removing an unknown id returns the same state', () => {
  const state = four();
  assert.equal(removeToast(state, 'nope'), state);
});
