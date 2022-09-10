import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';

export const TextArea = forwardRef(({ className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return <textarea className={cn(styles.textArea, className)} {...props} ref={ref} ></textarea>
})

TextArea.displayName = 'TextArea';
