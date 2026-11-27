import React from 'react';
import { type IconSource } from './iconSlot';
/** `aria-*`, `data-*`, `id` and `title` are forwarded to the rendered `<button>` (or `<a>` when `href` is set) */
interface ButtonProps extends React.AriaAttributes {
    id?: string;
    title?: string;
    [dataAttr: `data-${string}`]: string | number | boolean | undefined;
    size: 'tiny' | 'small' | 'medium' | 'large';
    type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
    color?: 'default' | 'danger';
    state: 'enabled' | 'hovered' | 'focused' | 'disabled' | 'selected';
    label: string;
    secondLabel?: string;
    /** A Lucide icon name, an icon component (only that icon is bundled) or an element */
    decoIcon?: IconSource;
    /** A Lucide icon name, an icon component (only that icon is bundled) or an element */
    actionIcon?: IconSource;
    onClickButton?: any;
    onClickActionIcon?: () => void;
    className?: string;
    /** Shows a spinner in the icon slot, keeps the label, and disables the button */
    loading?: boolean;
    /** Renders a link that looks like the button. A path goes through `next/link`; an `http(s)://` URL is a plain `<a>`. */
    href?: string;
    /** With `href`: open the link in a new tab */
    openInNewTab?: boolean;
    /** With `href` to a path: replace the current history entry instead of adding one */
    replace?: boolean;
    /** The `<button>`'s own `type`. Use `submit` for a form's submit button. Defaults to `button`. */
    htmlType?: 'button' | 'submit' | 'reset';
}
export default function Button({ size, type, color, state, label, secondLabel, decoIcon, actionIcon, onClickButton, onClickActionIcon, className, loading, href, openInNewTab, replace, htmlType, ...rest }: ButtonProps): React.JSX.Element;
export {};
