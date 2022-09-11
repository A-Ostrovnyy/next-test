import cn from 'classnames';

import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
    appearance = 'primary',
    icon,
    className,
    ...props
}: ButtonIconProps): JSX.Element => {
    const buttonClass = cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.white]: appearance === 'white',
    });

    const IconComponent = icons[icon];

    return (
        <button className={buttonClass} {...props}>
            <IconComponent />
        </button>
    )
}
