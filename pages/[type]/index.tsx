import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'node:querystring';

import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { API } from '../../helpers/api';


function Type({ firstCategory }: TypeProps): JSX.Element {
    return (
        <>
            Search page: {firstCategory}
        </>
    );
}

export default withLayout(Type);

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    const firstCategoryItem = firstLevelMenu.find(({ route }) => route === params?.type);
    if (!params || !firstCategoryItem) {
        return {
            notFound: true
        }
    }
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find,
        { firstCategory: firstCategoryItem.id });
    return {
        props: {
            firstCategory: firstCategoryItem.id,
            menu
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(({ route }) => `/${route}`),
        fallback: true
    }
}

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
