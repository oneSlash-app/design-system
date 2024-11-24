import React from 'react';
interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    actions?: React.ReactNode;
    size?: 'medium' | 'large';
}
export default function Modal({ isOpen, title, children, onClose, actions, size, }: ModalProps): React.JSX.Element | null;
export {};
