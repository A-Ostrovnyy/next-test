import { GetStaticProps } from 'next';
import axios from 'axios';

import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';


function Search(): JSX.Element {
    return (
        <>
            Search page
        </>
    );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, { firstCategory });
    return {
        props: {
            firstCategory,
            menu
        }
    };
};

interface SearchProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
