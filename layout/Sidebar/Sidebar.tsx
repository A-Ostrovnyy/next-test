import { FC } from 'react';
import cn from 'classnames';

import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';

import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo} />
            <div>Search</div>
            <Menu />
        </div>
    )
}
