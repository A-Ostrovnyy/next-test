import { FC } from 'react';
import cn from 'classnames';

import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './P.module.css';

export const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
    return (
        <div className={cn(styles.sort, className)} {...props}>
            <span
                onClick={() => setSort(SortEnum.Rating)}
                className={cn(styles.sortItem, {
                    [styles.active]: sort === SortEnum.Rating
                })}
            >
                <SortIcon className={styles.sortIcon} />By rating
            </span>
            <span
                onClick={() => setSort(SortEnum.Price)}
                className={cn(styles.sortItem, {
                    [styles.active]: sort === SortEnum.Price
                })}
            >
                <SortIcon className={styles.sortIcon} />By&nbsp;price
            </span>
        </div>
    )
}
