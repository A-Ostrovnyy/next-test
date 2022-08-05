import {FC} from 'react';
import cn from 'classnames';

import {CardColor, CardProps} from './Card.props';
import styles from './Card.module.css';

export const Card: FC<CardProps> = ({ color = CardColor.white, className, children, ...props }) => {
    return <article className={cn(styles.card, className, {
        [styles.blue]: color === CardColor.blue
    })} {...props}>
        {children}
    </article>
}
