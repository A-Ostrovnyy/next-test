import { FC } from 'react';
import cn from 'classnames';

import { InputProps } from './Input.props';
import styles from './P.module.css';

export const Input: FC<InputProps> = ({ className, ...props }) => {
    return <input className={cn(styles.input, className)} {...props} />
}
