import { Advantages, HhData, Htag, Tag } from '../../components';
import { TagColor, TagSize } from '../../components/Tag/Tag.props';

import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color={TagColor.grey} size={TagSize.medium}>{products.length}</Tag>}
                <span>Sort</span>
            </div>
            <div>
                {products && products.map((p) => (<div key={p._id}>{p.title}</div>))}
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
                page.seoText && <p>{page.seoText}</p>
            }
            <Htag tag='h2'>Skills</Htag>
            {
                page.tags.map((t) => <Tag key={t} color={TagColor.primary}>{t}</Tag>)
            }
        </div>
    )
}
