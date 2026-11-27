'use client';
import React, { Suspense, lazy } from 'react';

/**
 * A component that draws an icon, such as one imported from `lucide-react`. It is given
 * `className` and `strokeWidth` (and `size` by Icon). The props are `any` so that Lucide icons
 * and plain SVG components both fit under React 18 and 19 types.
 */
export type IconComponent = React.ComponentType<any>;

/**
 * What a component's icon prop accepts:
 * - a Lucide icon name (`"Plus"`). The icon set loads in its own chunk the first time a name is used.
 * - an icon component (`Plus` from `lucide-react`). Sized and stroked like a named icon, and only
 *   that icon is bundled.
 * - an element (`<Logo />`). Rendered as given; the caller sizes it.
 */
export type IconSource = string | IconComponent | React.ReactElement;

const NamedIcon = lazy(() => import('./namedIcon'));

interface IconSlotProps {
  icon: IconSource | null | undefined;
  className?: string;
  strokeWidth?: number;
  /** Pixel size, for icons sized by a number instead of a class */
  size?: number;
  warnIfMissing?: boolean;
}

export default function IconSlot({ icon, className, strokeWidth = 2, size, warnIfMissing }: IconSlotProps) {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === 'string') {
    return (
      // The empty box holds the icon's place until the icon set has loaded
      <Suspense
        fallback={
          <span
            aria-hidden="true"
            className={`inline-block ${className ?? ''}`}
            style={size !== undefined ? { width: size, height: size } : undefined}
          />
        }
      >
        <NamedIcon name={icon} className={className} strokeWidth={strokeWidth} size={size} warnIfMissing={warnIfMissing} />
      </Suspense>
    );
  }
  const Component = icon as IconComponent;
  return <Component className={className} strokeWidth={strokeWidth} {...(size !== undefined ? { size } : {})} />;
}
