// The toast store's pure helpers, from the compiled dist/components/toaster.jsx.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { dist } = require('./compile-dist');

const file = path.join(dist, 'components', 'toaster.jsx');
const { addToast, removeToast, visibleToasts, pauseReducer, isPaused } = require(file);

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

test('a duration setTimeout cannot hold stays until closed', () => {
  for (const duration of [Infinity, -Infinity, NaN, 2 ** 31]) {
    assert.equal(addToast([], { message: 'Saved', duration }, 'x')[0].duration, null, String(duration));
  }
  assert.equal(addToast([], { message: 'Saved', duration: 2 ** 31 - 1 }, 'x')[0].duration, 2 ** 31 - 1);
});

const run = (events) => events.reduce(pauseReducer, { hovered: false, focused: false });

test('a toast stays paused while focused, even after the pointer passes over and leaves', () => {
  assert.equal(isPaused(run(['focus', 'pointerEnter', 'pointerLeave'])), true);
});

test('a toast stays paused while hovered, even after focus leaves it', () => {
  assert.equal(isPaused(run(['pointerEnter', 'focus', 'blur'])), true);
});

test('a toast resumes once both pointer and focus have left', () => {
  assert.equal(isPaused(run(['focus', 'pointerEnter', 'pointerLeave', 'blur'])), false);
});
