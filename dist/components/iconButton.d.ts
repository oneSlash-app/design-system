import React from 'react';
import type * as LucideIcons from 'lucide-react';
import { type IconComponent } from './iconSlot';
/** `aria-*`, `data-*`, `id` and `title` are forwarded to the rendered `<button>` (or `<a>` when `href` is set) */
interface IconButtonProps extends React.AriaAttributes {
    id?: string;
    title?: string;
    [dataAttr: `data-${string}`]: string | number | boolean | undefined;
    color: "primary" | "secondary" | "tertiary" | "iconOnly";
    state: "enabled" | "selected" | "disabled";
    size: "large" | "medium" | "small" | "tiny";
    /** A Lucide icon name. Give this or `icon`. */
    iconName?: keyof typeof LucideIcons;
    /** An icon component (only that icon is bundled) or an element. Wins over `iconName`. Pass `ariaLabel` with it. */
    icon?: IconComponent | React.ReactElement;
    onClick?: any;
    loading?: boolean;
    /** Screen-reader label. Defaults to the icon name, e.g. "Settings"; with `icon` there is no name, so set it. */
    ariaLabel?: string;
    /** Renders a link that looks like the button. A path goes through `next/link`; an `http(s)://` URL is a plain `<a>`. */
    href?: string;
    /** With `href`: open the link in a new tab */
    openInNewTab?: boolean;
    /** With `href` to a path: replace the current history entry instead of adding one */
    replace?: boolean;
}
export default function IconButton({ color, state, size, iconName, icon, onClick, loading, // Default to false
ariaLabel, href, openInNewTab, replace, ...rest }: IconButtonProps): React.JSX.Element;
export {};
