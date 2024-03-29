import cn from 'classnames';

import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './P.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div className={cn(styles.sort, className)} {...props}>
            <div className={styles.sortName} id='sort'>Sorting</div>
            <button
                id='rating'
                onClick={() => setSort(SortEnum.Rating)}
                aria-selected={sort === SortEnum.Rating}
                aria-labelledby='sort rating'
                className={cn(styles.sortItem, {
                    [styles.active]: sort === SortEnum.Rating
                })}
            >
                <SortIcon className={styles.sortIcon} />By rating
            </button>
            <button
                id='price'
                onClick={() => setSort(SortEnum.Price)}
                aria-selected={sort === SortEnum.Price}
                aria-labelledby='sort price'
                className={cn(styles.sortItem, {
                    [styles.active]: sort === SortEnum.Price
                })}
            >
                <SortIcon className={styles.sortIcon} />By&nbsp;price
            </button>
        </div>
    )
}
