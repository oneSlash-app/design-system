// Alert's pure helper, kept out of the public API (index.ts and the package exports do not reach internal/)

// Whether the alert starts its own dismiss timer
export function shouldAutoDismiss({ autoDismiss, showCloseButton }: { autoDismiss?: boolean; showCloseButton?: boolean }) {
  return autoDismiss ?? !showCloseButton;
}
