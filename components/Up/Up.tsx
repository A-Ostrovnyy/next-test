import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useScrollY } from '../../hooks/useScrollY';

import styles from './Up.module.css';
import UpIcon from './up.svg';

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
            onClick={handleScrollToTop}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <UpIcon />
        </motion.button>
    )
}
