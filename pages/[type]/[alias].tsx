import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'node:querystring';

import { Button, P, Htag, Tag, Rating } from '../../components';
import { ButtonAppearance, ButtonArrow } from '../../components/Button/Button.props';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';


function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
    return (
        <TopPageComponent page={page} products={products} firstCategory={firstCategory} />
    );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
            { firstCategory: m.id });
        paths = paths.concat(menu.flatMap(({ pages }) => pages.map(({ alias }) => `/${m.route}/${alias}`)))
    }

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    const firstCategoryItem = firstLevelMenu.find(({ route }) => route === params?.type);
    if (!params || !firstCategoryItem) {
        return {
            notFound: true
        }
    }
    try {
        const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
            { firstCategory: firstCategoryItem.id });
        if (menu.length === 0) {
            return {
                notFound: true
            }
        }
        const { data: page } = await axios.get<TopPageModel>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`);
        const { data: products } = await axios.post<ProductModel[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find/`,
            { category: page.category, limit: 10 });
        return {
            props: {
                firstCategory: firstCategoryItem.id,
                menu,
                page,
                products
            }
        };
    } catch {
        return {
            notFound: true
        }
    }
};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel,
    products: ProductModel[]
}
