import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { CardColor, CardProps } from './Card.props';
import styles from './Card.module.css';

export const Card = forwardRef(({ color = CardColor.white, className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <article
            className={cn(styles.card, className, {
                [styles.blue]: color === CardColor.blue
            })}
            ref={ref}
            {...props}
        >
            {children}
        </article>
    )
})

Card.displayName = 'Card';
