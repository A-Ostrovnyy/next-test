import cn from 'classnames';
import { motion } from 'framer-motion';

import { ButtonProps, ButtonAppearance, ButtonArrow } from './Button.props';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';

export const Button = ({
    children,
    appearance = ButtonAppearance.primary,
    className,
    arrow = ButtonArrow.none,
    ...props
}: ButtonProps): JSX.Element => {
    const buttonClass = cn(styles.button, className, {
        [styles.primary]: appearance === ButtonAppearance.primary,
        [styles.ghost]: appearance === ButtonAppearance.ghost,
    });

    const buttonArrowClass = cn(styles.arrow, {
        [styles.down]: arrow === ButtonArrow.down,
        [styles.right]: arrow === ButtonArrow.right,
    });

    return (
        <motion.button
            className={buttonClass}
            {...props}
            whileHover={{ scale: 1.05 }}
        >
            {children}
            {
                arrow !== ButtonArrow.none &&
                <span className={buttonArrowClass}><ArrowIcon /></span>
            }
        </motion.button>
    )
}
