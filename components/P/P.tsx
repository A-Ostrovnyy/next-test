import { FC } from 'react';
import cn from 'classnames';

import { PProps, PSize } from './P.props';
import styles from './P.module.css';

export const P: FC<PProps> = ({size = PSize.medium, className, children, ...props}) => {
    const pClassName = cn(styles.p, className, {
        [styles.small]: size === PSize.small,
        [styles.medium]: size === PSize.medium,
        [styles.large]: size === PSize.large,
    })
    return <p className={pClassName} {...props}>{children}</p>
}
