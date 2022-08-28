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
                <Advantages advantages={page.advantages} />
            }
        </div>
    )
}
