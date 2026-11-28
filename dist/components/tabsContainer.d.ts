import React from 'react';
interface TabsContainerProps {
    children: React.ReactNode;
    /** The container is as wide as its parent and every tab takes an equal share, label centered. */
    fill?: boolean;
}
export declare const TabsContainerContext: React.Context<boolean>;
export declare const TabsFillContext: React.Context<boolean>;
export default function TabsContainer({ children, fill, }: TabsContainerProps): React.JSX.Element;
export {};
