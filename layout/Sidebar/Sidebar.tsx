import cn from 'classnames';

import { Menu } from '../Menu/Menu';
import { Search } from '../../components';
import Logo from '../logo.svg';

import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo} />
            <Search />
            <Menu />
        </div>
    )
}
