import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Rating } from '../Rating/Rating';

import UserIcon from './user.svg';
import { ReviewProps } from './Review.props';
import styles from './Review.module.css';

export const Review = ({ review, className, children, ...props }: ReviewProps): JSX.Element => {
    return (
        <article className={cn(styles.review, className)} {...props}>
            <UserIcon className={styles.userIcon} />
            <div className={styles.title}>
                <span className={styles.name}>{review.name}:&nbsp;&nbsp;</span>
                <span>{review.title}</span>
            </div>
            <time className={styles.date}>
                {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: ru })}
            </time>
            <div className={styles.rating}>
                <Rating rating={review.rating} />
            </div>
            <p className={styles.description}>
                {review.description}
            </p>
        </article>
    )
}
