import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';

export const TextArea = forwardRef(({ className, error, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(className, styles.textAreaWrapper)}>
            <textarea
                className={cn(className, {
                    [styles.error]: error
                })}
                ref={ref}
                {...props}
            ></textarea>
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})

TextArea.displayName = 'TextArea';
