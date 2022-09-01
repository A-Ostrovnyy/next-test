import { FC } from 'react';
import cn from 'classnames';

import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';

export const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
    return <textarea className={cn(styles.textArea, className)} {...props} ></textarea>
}
