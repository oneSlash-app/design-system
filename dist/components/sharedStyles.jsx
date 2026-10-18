// Class strings shared across components. Kept in a .tsx file so it compiles
// to dist/components/*.jsx, which consuming apps' Tailwind configs scan.
// Keyboard focus indicator for every interactive element. Uses the primary text
// color (black in light, near-white in dark): the accent yellow is 1.9:1 on the
// light background and too faint to see.
export var focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-text-primary dark:focus-visible:outline-dark-text-primary';
export var focusRingDanger = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-error-main dark:focus-visible:outline-dark-error-main';
// Motion is quick and snappy everywhere, and off for prefers-reduced-motion.
// Hover/selected/disabled changes plus press feedback: colors, opacity and transform
export var stateTransition = 'transition duration-150 ease-out motion-reduce:transition-none';
// Pressed controls dip slightly. `enabled:` skips disabled <button>s.
export var pressFeedback = 'enabled:active:scale-[0.97]';
// For clickable elements that aren't <button>s
export var pressFeedbackAny = 'active:scale-[0.97]';
// Overlays (Modal, Popover, Select menu) fade and scale in
export var overlayTransition = 'transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';
export var overlayHidden = 'opacity-0 scale-[0.96]';
export var overlayVisible = 'opacity-100 scale-100';
// Small marks (checkbox tick, radio dot) pop in with a slight overshoot
export var popTransition = 'transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none';
