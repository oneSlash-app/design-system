import React from 'react';
type TabProps = {
    label: string;
    href?: string;
    isSelected: boolean;
    onClickTab: () => void;
    onClickActionIcon?: any;
    decoIcon?: string;
    actionIcon?: string;
};
export default function Tab({ label, href, isSelected, onClickTab, onClickActionIcon, decoIcon, actionIcon }: TabProps): React.JSX.Element;
export {};
