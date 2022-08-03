import { FC, useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppContext } from '../../context/app.context';
import { firstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';

import styles from './Menu.module.css';


export const Menu: FC = () => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

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
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: item.isOpened
                        })}>
                            {buildThirdLevel(item.pages, menuItem.route)}
                        </div>
                    </div>
                )
            })}
        </div>
    )

    const buildThirdLevel = (pages: PageItem[], route: string) => (
        <>
            {pages.map((page) => (
                <Link key={page._id} href={`/${route}/${page.alias}`}>
                    <a className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                    })} >
                        {page.category}
                    </a>
                </Link>
            ))}
        </>
    )

    return (
        <nav className={styles.menu}>{buildFirstLevelMenu()}</nav>
    )
}
