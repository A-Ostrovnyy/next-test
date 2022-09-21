import cn from 'classnames';

import { PProps, PSize } from './P.props';
import styles from './P.module.css';

export const P = ({ size = PSize.medium, className, children, ...props }: PProps): JSX.Element => {
    const pClassName = cn(styles.p, className, {
        [styles.small]: size === PSize.small,
        [styles.medium]: size === PSize.medium,
        [styles.large]: size === PSize.large,
    })
    return <p className={pClassName} {...props}>{children}</p>
}
