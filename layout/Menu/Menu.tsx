import { useContext, KeyboardEvent } from 'react';
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

    const openSecondLevelKey = (e: KeyboardEvent, secondCategory: string) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            openSecondLevel(secondCategory);
        }
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
                        <div
                            tabIndex={0}
                            className={styles.secondLevel}
                            onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
                            onClick={() => openSecondLevel(item._id.secondCategory)}>
                            {item._id.secondCategory}
                        </div>
                        <motion.div
                            layout
                            variants={variants}
                            className={cn(styles.secondLevelBlock)}
                            animate={item.isOpened ? 'visible' : 'hidden'}
                            initial={item.isOpened ? 'visible' : 'hidden'}
                        >
                            {buildThirdLevel(item.pages, menuItem.route, item.isOpened ?? false)}
                        </motion.div>
                    </div>
                )
            })}
        </div>
    )

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => (
        <>
            {pages.map((page) => (
                <motion.div
                    key={page._id}
                    variants={variantsChildren}
                >
                    <Link href={`/${route}/${page.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                            })}
                        >
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
