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
};
export default function Tab({ label, secondLabel, href, isSelected, onClickTab, onClickActionIcon, decoIcon, actionIcon, router }: TabProps): React.JSX.Element;
export {};
