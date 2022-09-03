import { FC } from 'react';
import cn from 'classnames';

import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';

export const Divider: FC<DividerProps> = ({ className, ...props }) => {

    return <hr className={cn(styles.divider, className)} {...props} />
}
