import { useContext, KeyboardEvent, useState } from 'react';
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
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
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
                setAnnounce(m.isOpened ? 'closed' : 'opened');
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
        <ul className={styles.firstLevelList}>
            {firstLevelMenu.map((menuItem) => (
                <li key={menuItem.route}>
                    <Link href={`/${menuItem.route}`} aria-expanded={menuItem.id === firstCategory}>
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
                </li>
            ))}
        </ul>
    )

    const buildSecondLevel = (menuItem: firstLevelMenuItem) => (
        <ul className={styles.secondBlock}>
            {menu.map((item) => {
                if (item.pages.map(({ alias }) => alias).includes(router.asPath.split('/')[2])) {
                    item.isOpened = true;
                }
                return (
                    <li key={item._id.secondCategory}>
                        <button
                            tabIndex={0}
                            className={styles.secondLevel}
                            onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
                            onClick={() => openSecondLevel(item._id.secondCategory)}>
                            {item._id.secondCategory}
                            aria-expanded={item.isOpened ?? false}
                        </button>
                        <motion.ul
                            layout
                            variants={variants}
                            className={cn(styles.secondLevelBlock)}
                            animate={item.isOpened ? 'visible' : 'hidden'}
                            initial={item.isOpened ? 'visible' : 'hidden'}
                        >
                            {buildThirdLevel(item.pages, menuItem.route, item.isOpened ?? false)}
                        </motion.ul>
                    </li>
                )
            })}
        </ul>
    )

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => (
        <>
            {pages.map((page) => (
                <motion.li
                    key={page._id}
                    variants={variantsChildren}
                >
                    <Link href={`/${route}/${page.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                            })}
                            aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : 'false'}
                        >
                            {page.category}
                        </a>
                    </Link>
                </motion.li>
            ))}
        </>
    )

    return (
        <nav className={styles.menu} role='navigation' >
            {
                announce &&
                <span className='visuallyHidden' role='log'>
                    {announce === 'opened' ? 'expanded' : 'collapsed'}
                </span>
            }
            {buildFirstLevelMenu()}
        </nav>
    )
}
