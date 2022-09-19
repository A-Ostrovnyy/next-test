import { useState, Fragment, useRef, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { TagColor } from '../Tag/Tag.props';
import { P } from '../P/P';
import { Button } from '../Button/Button';
import { ButtonAppearance, ButtonArrow } from '../Button/Button.props';
import { CardColor } from '../Card/Card.props';
import { declOfNum, priceDollar } from '../../helpers/helpers';
import { Htag } from '../Htag/Htag';
import { Divider } from '../Divider/Divider';

import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

    const handleReviewsVisibility = () => {
        setIsReviewOpened((prev) => !prev);
    }
    const reviewRef = useRef<HTMLDivElement>(null);

    const handleScrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    }

    return (
        <article
            className={cn(className)}
            ref={ref}
            {...props}
        >
            <Card>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        loading="lazy"
                        width={70}
                        height={70}
                    />
                </div>
                {/* <Htag tag='h2' className={styles.title}>{product.title}</Htag> */}
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span className='visually-hidden'>price</span>
                    {priceDollar(product.price)}
                    {product.oldPrice &&
                        <Tag className={styles.oldPrice} color={TagColor.green}>
                            <span className='visually-hidden'>discount</span>
                            {priceDollar(product.price - product.oldPrice)}
                        </Tag>}
                </div>
                <div className={styles.credit}>
                    <span className='visually-hidden'>Credit</span>
                    {priceDollar(product.credit)}/<span className={styles.month}>month</span>
                </div>
                <div className={styles.rating}>
                    <span className='visually-hidden'>{'rating' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating} />
                </div>
                <div className={styles.tags}>
                    {product.categories.map((c) => <Tag key={c} className={styles.category} color={TagColor.ghost} >{c}</Tag>)}
                </div>
                <div className={styles.priceTitle} aria-hidden={true}>price</div>
                <div className={styles.creditTitle} aria-hidden={true}>credit</div>
                <div className={styles.ratingTitle}>
                    <a href="#ref" onClick={handleScrollToReview}>
                        {declOfNum(product.reviewCount, ['review', 'reviews', 'reviews'])}
                    </a>
                </div>
                <Divider className={styles.hr} />
                <P className={styles.description}>{product.description}</P>
                <div className={styles.features}>
                    {product.characteristics.map((c) => (
                        <div key={c.name} className={styles.characteristic}>
                            <span className={styles.characteristicName}>{c.name}</span>
                            <span className={styles.characteristicDots}></span>
                            <span className={styles.characteristicValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <section className={styles.advBlock}>
                    {
                        product.advantages &&
                        <div className={styles.advantages}>
                            <div className={styles.advBlockTitle}>Advantages</div>
                            <P>{product.advantages}</P>
                        </div>
                    }
                    {
                        styles.disadvantages &&
                        <div className={styles.disadvantages}>
                            <div className={styles.advBlockTitle}>Disadvantages</div>
                            <P>{product.disadvantages}</P>
                        </div>
                    }
                </section>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance={ButtonAppearance.primary} >Learn more</Button>
                    <Button
                        appearance={ButtonAppearance.ghost}
                        arrow={isReviewOpened ? ButtonArrow.down : ButtonArrow.right}
                        className={styles.reviewButton}
                        onClick={handleReviewsVisibility}
                    >Reviews</Button>
                </div>
            </Card>

            <Card
                tabIndex={isReviewOpened ? 0 : -1}
                color={CardColor.blue}
                className={cn(styles.reviews, {
                    [styles.opened]: isReviewOpened,
                    [styles.closed]: !isReviewOpened
                })}
                ref={reviewRef}
            >
                {
                    product.reviews.map((r) => (
                        <Fragment key={r._id}>
                            <Review review={r} />
                            <Divider />
                        </Fragment>
                    ))
                }
                <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
        </article>
    )
}));

Product.displayName = 'Product';

