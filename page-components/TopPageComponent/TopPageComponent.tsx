import { useEffect, useReducer } from 'react';

import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TagColor, TagSize } from '../../components/Tag/Tag.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';

import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { SortReducer } from './sort.reducer';


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {

    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(SortReducer, { products, sort: SortEnum.Rating });

    const handleSort = (sort: SortEnum): void => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {
                    products &&
                    <Tag
                        color={TagColor.grey}
                        size={TagSize.medium}
                        aria-label={`${products.length} items`}
                    >
                        {products.length}
                    </Tag>
                }
                <Sort sort={sort} setSort={handleSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map((p) => (<Product layout product={p} key={p._id} />))}
            </div>

            <div className={styles.hhTitle}>
                <Htag tag='h2'>Vacancies - {page.category}</Htag>
                <Tag color={TagColor.red} size={TagSize.medium}>Glassdoor</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 &&
                <>
                    <Htag tag='h2'>Advantages</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            }
            {
                page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
            }
            <Htag tag='h2'>Skills</Htag>
            {
                page.tags.map((t) => <Tag key={t} color={TagColor.primary}>{t}</Tag>)
            }
        </div>
    )
}
