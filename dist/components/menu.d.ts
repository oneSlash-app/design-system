import React from 'react';
interface MenuProps {
    children: React.ReactNode;
    width?: number | string;
    className?: string;
}
declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;
export default Menu;
export { Menu };
