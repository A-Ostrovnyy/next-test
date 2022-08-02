import { FC, useContext, useEffect } from 'react';
import cn from 'classnames';

import { AppContext } from '../../context/app.context';
import { firstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import styles from './Menu.module.css';

const firstLevelMenu: firstLevelMenuItem[] = [
    {
        route: 'courses',
        name: 'Курси',
        icon: <CoursesIcon />,
        id: TopLevelCategory.Courses
    },
    {
        route: 'services',
        name: 'Сервіси',
        icon: <ServicesIcon />,
        id: TopLevelCategory.Services
    },
    {
        route: 'books',
        name: 'Книжки',
        icon: <BooksIcon />,
        id: TopLevelCategory.Books
    },
    {
        route: 'products',
        name: 'Продукти',
        icon: <ProductsIcon />,
        id: TopLevelCategory.Products
    }
];

export const Menu: FC = () => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    useEffect(() => {
        setMenu && setMenu([]);
    });

    const buildFirstLevelMenu = () => (
        <>
            {firstLevelMenu.map((menuItem) => (
                <div key={menuItem.route}>
                    <a href={`/${menuItem.route}`}>
                        <div className={cn(styles.firstLevel, {
                            [styles.firstLevelActive]: menuItem.id === firstCategory
                        })}>
                            {menuItem.icon}
                            <span>{menuItem.name}</span>
                        </div>
                    </a>
                    {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
                </div>
            ))}
        </>
    )

    const buildSecondLevel = (menuItem: firstLevelMenuItem) => (
        <div className={styles.secondBlock}>
            {menu.map((item) => (
                <div key={item._id.secondCategory}>
                    <div className={styles.secondLevel}>{item._id.secondCategory}</div>
                    <div className={cn(styles.secondLevelBlock, {
                        [styles.secondLevelBlockOpened]: item.isOpened
                    })}>
                        {buildThirdLevel(item.pages, menuItem.route)}
                    </div>
                </div>
            ))}
        </div>
    )

    const buildThirdLevel = (pages: PageItem[], route: string) => (
        <>
            {pages.map((page) => (
                <a key={page._id} href={`/${route}/${page.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false
                })} >
                    {page.category}
                </a>
            ))}
        </>
    )

    return (
        <nav className={styles.menu}>{buildFirstLevelMenu()}</nav>
    )
}
