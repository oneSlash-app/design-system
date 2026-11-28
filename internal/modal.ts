// Modal's pure helpers, kept out of the public API (index.ts and the package exports do not reach internal/)

// Elements to try for the first focus, best first. 'body' puts the body's elements ahead of the
// panel's, so it falls back to 'first' when the body has none or none of them takes focus.
export function initialFocusCandidates<T>(
  panelFocusables: T[],
  bodyFocusables: T[],
  initialFocus: 'first' | 'body' = 'first',
): T[] {
  return initialFocus === 'body' ? [...bodyFocusables, ...panelFocusables] : panelFocusables;
}

// Which element gets focus when the panel opens
export function pickInitialFocus<T>(
  panelFocusables: T[],
  bodyFocusables: T[],
  initialFocus: 'first' | 'body' = 'first',
): T | undefined {
  return initialFocusCandidates(panelFocusables, bodyFocusables, initialFocus)[0];
}
