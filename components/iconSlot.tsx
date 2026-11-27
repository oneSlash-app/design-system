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
 * - an element (`<Plus />`, `<Logo />`). The only form a Server Component can pass. An element
 *   whose classes set no size is sized like a named icon; one with a size class of its own
 *   (`w-*`, `h-*`, `size-*`) is rendered as given, so the caller's size wins.
 */
export type IconSource = string | IconComponent | React.ReactElement;

const NamedIcon = lazy(() => import('./namedIcon'));

// A Tailwind class that sets a width or a height, with any variant or `!` in front
const SIZE_CLASS = /(^|[\s:!])(w|h|size)-/;

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
  if (React.isValidElement(icon)) {
    const own = icon.props as { className?: string; strokeWidth?: number; size?: number };
    // The caller's own size wins: two size classes on one element would leave the result to CSS order
    if (own.className && SIZE_CLASS.test(own.className)) return icon;
    const merged = [own.className, className].filter(Boolean).join(' ') || undefined;
    // A Lucide icon passed from a Server Component arrives already rendered, as an <svg> with
    // Lucide's own classes and its default width and height. The size class overrides those
    // attributes; a pixel size replaces them.
    if (typeof icon.type === 'string') {
      const box = size !== undefined && icon.type === 'svg' ? { width: size, height: size } : {};
      return React.cloneElement(icon as React.ReactElement<any>, { className: merged, ...box });
    }
    // `strokeWidth` and `size` are props of an icon component, not attributes of a plain tag
    return React.cloneElement(icon as React.ReactElement<any>, {
      className: merged,
      strokeWidth: own.strokeWidth ?? strokeWidth,
      ...(size !== undefined && own.size === undefined ? { size } : {}),
    });
  }
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
