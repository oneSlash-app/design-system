import React from 'react';
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
 *   without a `className` is sized and stroked like a named icon; one with a `className` is
 *   rendered as given, so the caller's own size wins.
 */
export type IconSource = string | IconComponent | React.ReactElement;
interface IconSlotProps {
    icon: IconSource | null | undefined;
    className?: string;
    strokeWidth?: number;
    /** Pixel size, for icons sized by a number instead of a class */
    size?: number;
    warnIfMissing?: boolean;
}
export default function IconSlot({ icon, className, strokeWidth, size, warnIfMissing }: IconSlotProps): React.JSX.Element | null;
export {};
