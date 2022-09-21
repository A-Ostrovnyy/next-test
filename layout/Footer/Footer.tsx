import cn from 'classnames';
import { format } from 'date-fns'

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>OwlTop © 2020 - {format(Date.now(), 'yyyy')} All rights reserved</div>
            <a href="#" target="_blank" rel="noopener nofollow">User agreement</a>
            <a href="#" target="_blank" rel="noopener nofollow">Privacy policy</a>
        </footer>
    )
}
