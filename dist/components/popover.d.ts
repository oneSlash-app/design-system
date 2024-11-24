import React from 'react';
interface PopoverProps {
    id?: string;
    anchorEl?: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export default function Popover({ id, anchorEl, open, onClose, children, }: PopoverProps): React.ReactPortal | null;
export {};
