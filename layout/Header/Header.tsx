import { useEffect, useState } from 'react';
import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';

import Logo from '../logo.svg';
import { Sidebar } from '../Sidebar/Sidebar';
import { ButtonIcon } from '../../components';

import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const shouldReducedMotion = useReducedMotion();
    const router = useRouter();

    const handleMenuVisibility = () => {
        setIsOpened((prev) => !prev);
    }

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: shouldReducedMotion ? 1 : 0,
            x: '100%',
        }
    }

    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    return (
        <header
            className={cn(styles.header, className)}
            {...props}
        >
            <Logo />
            <ButtonIcon
                appearance='white'
                icon='menu'
                onClick={handleMenuVisibility}
            />
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial='closed'
                animate={isOpened ? 'opened' : 'closed'}
            >
                <Sidebar />
                <ButtonIcon
                    className={styles.menuClose}
                    appearance='white'
                    icon='close'
                    onClick={handleMenuVisibility}
                />
            </motion.div>
        </header>
    )
}
