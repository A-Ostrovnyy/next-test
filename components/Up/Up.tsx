import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

import styles from './Up.module.css';

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY()

    const handleScrollToTop = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }

    useEffect(() => {
        controls.start({
            opacity: y / document.body.scrollHeight
        })
    }, [y, controls]);

    return (
        <motion.button
            className={styles.up}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon icon="up" aria-label='Up' appearance="primary" onClick={handleScrollToTop} />
        </motion.button>
    )
}
