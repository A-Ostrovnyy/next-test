import { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { AppContext } from '../../context/app.context';
import { firstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';

import styles from './Menu.module.css';


export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((m) => {
            if (m._id.secondCategory === secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m
        }))
    }

    const buildFirstLevelMenu = () => (
        <>
            {firstLevelMenu.map((menuItem) => (
                <div key={menuItem.route}>
                    <Link href={`/${menuItem.route}`}>
                        <a>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menuItem.id === firstCategory
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </div>
                        </a>
                    </Link>
                    {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
                </div>
            ))}
        </>
    )

    const buildSecondLevel = (menuItem: firstLevelMenuItem) => (
        <div className={styles.secondBlock}>
            {menu.map((item) => {
                if (item.pages.map(({ alias }) => alias).includes(router.asPath.split('/')[2])) {
                    item.isOpened = true;
                }
                return (
                    <div key={item._id.secondCategory}>
                        <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>{item._id.secondCategory}</div>
                        <motion.div
                            layout
                            variants={variants}
                            className={cn(styles.secondLevelBlock)}
                            animate={item.isOpened ? 'visible' : 'hidden'}
                            initial={item.isOpened ? 'visible' : 'hidden'}
                        >
                            {buildThirdLevel(item.pages, menuItem.route)}
                        </motion.div>
                    </div>
                )
            })}
        </div>
    )

    const buildThirdLevel = (pages: PageItem[], route: string) => (
        <>
            {pages.map((page) => (
                <motion.div
                    key={page._id}
                    variants={variantsChildren}
                >
                    <Link href={`/${route}/${page.alias}`}>
                        <a className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                        })} >
                            {page.category}
                        </a>
                    </Link>
                </motion.div>
            ))}
        </>
    )

    return (
        <nav className={styles.menu}>{buildFirstLevelMenu()}</nav>
    )
}
