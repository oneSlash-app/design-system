import React from 'react';
import type { Gap } from './layout';

const gaps: Record<Gap, string> = {
  small: 'gap-small',
  medium: 'gap-medium',
  large: 'gap-large',
  xlarge: 'gap-xlarge',
  xxlarge: 'gap-xxlarge',
  huge: 'gap-huge',
  giant: 'gap-giant',
};

interface FormProps {
  children: React.ReactNode;
  /** Called when the form is submitted, from a submit Button or the Enter key. The page does not reload. */
  onSubmit: () => void;
  gap?: Gap;
  'aria-label'?: string;
}

// A column of fields that submits as one. Put a Button with `htmlType="submit"` inside it.
// The browser does not validate; the app shows its own errors.
export default function Form({ children, onSubmit, gap = 'large', 'aria-label': ariaLabel }: FormProps) {
  return (
    <form
      noValidate
      aria-label={ariaLabel}
      className={`flex flex-col ${gaps[gap]}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}
