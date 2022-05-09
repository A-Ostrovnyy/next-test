import {FC} from 'react';
import cn from 'classnames';

import { ButtonProps, ButtonAppearance, ButtonArrow } from './Button.props';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';

export const Button: FC<ButtonProps> = ({
    children,
    appearance = ButtonAppearance.primary,
    className,
    arrow = ButtonArrow.none,
    ...props
}) => {
    const buttonClass = cn(styles.button, className, {
        [styles.primary]: appearance === ButtonAppearance.primary, 
        [styles.ghost]: appearance === ButtonAppearance.ghost, 
    });

    const buttonArrowClass = cn(styles.arrow, {
        [styles.down]: arrow === ButtonArrow.down, 
        [styles.right]: arrow === ButtonArrow.right, 
    });

    return (
        <button className={buttonClass} {...props}>
            {children}
            {
                arrow !== ButtonArrow.none &&
                <span className={buttonArrowClass}><ArrowIcon /></span>
            }
        </button>
    )
}
