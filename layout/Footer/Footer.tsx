import { FC } from 'react';
import cn from 'classnames';
import { format } from 'date-fns'

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer: FC<FooterProps> = ({className, ...props}) => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>OwlTop © 2020 - {format(Date.now(), 'yyyy')} Все права защищены</div>
            <a href="#" target="_blank" rel="noopener nofollow">Пользовательское соглашение</a>
            <a href="#" target="_blank" rel="noopener nofollow">Политика конфиденциальности</a>
        </footer>
    )
}
