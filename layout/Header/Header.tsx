import { FC } from 'react';

import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

export const Header: FC<HeaderProps> = ({...props}) => {
    return <header {...props}>Header</header>
}
