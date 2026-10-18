import React from 'react';
type RouterLike = {
    push: (url: string) => void;
};
type TabProps = {
    label: string;
    secondLabel?: string;
    href?: string;
    isSelected: boolean;
    onClickTab: () => void;
    onClickActionIcon?: any;
    decoIcon?: string;
    actionIcon?: string;
    router?: RouterLike;
    size?: 'medium' | 'small' | 'tiny';
};
export default function Tab({ label, secondLabel, href, isSelected, onClickTab, onClickActionIcon, decoIcon, actionIcon, router, size, }: TabProps): React.JSX.Element;
export {};
