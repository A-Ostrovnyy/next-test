import { firstLevelMenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

export const firstLevelMenu: firstLevelMenuItem[] = [
    {
        route: 'courses', name: 'Курси', icon: <CoursesIcon />, id: TopLevelCategory.Courses
    },
    {
        route: 'services', name: 'Сервіси', icon: <ServicesIcon />, id: TopLevelCategory.Services
    },
    {
        route: 'books', name: 'Книжки', icon: <BooksIcon />, id: TopLevelCategory.Books
    },
    {
        route: 'products', name: 'Продукти', icon: <ProductsIcon />, id: TopLevelCategory.Products
    }
];

export const priceDollar = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' $')
}

export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)]]
}
