// Class strings shared across components. Kept in a .tsx file so it compiles
// to dist/components/*.jsx, which consuming apps' Tailwind configs scan.

// Keyboard focus indicator for every interactive element. Uses the primary text
// color (black in light, near-white in dark): the accent yellow is 1.9:1 on the
// light background and too faint to see.
export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-primary';

export const focusRingDanger =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-main';

// Motion is quick and snappy everywhere, and off for prefers-reduced-motion.

// Hover/selected/disabled changes plus press feedback: colors, opacity and transform
export const stateTransition = 'transition duration-[var(--os-duration-fast)] ease-out motion-reduce:transition-none';

// Pressed controls dip slightly. `enabled:` skips disabled <button>s.
export const pressFeedback = 'enabled:active:scale-[0.97]';
// For clickable elements that aren't <button>s
export const pressFeedbackAny = 'active:scale-[0.97]';

// Overlays (Modal, Popover, Select menu) fade and scale in
export const overlayTransition =
  'transition-[opacity,transform] duration-[var(--os-duration-fast)] ease-emphasized motion-reduce:transition-none';
export const overlayHidden = 'opacity-0 scale-[0.96]';
export const overlayVisible = 'opacity-100 scale-100';

// Small marks (checkbox tick, radio dot) pop in with a slight overshoot
export const popTransition =
  'transition-transform duration-[var(--os-duration-fast)] ease-spring motion-reduce:transition-none';
