import { FC } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { TagColor } from '../Tag/Tag.props';
import { P } from '../P/P';
import { Button } from '../Button/Button';
import { ButtonAppearance, ButtonArrow } from '../Button/Button.props';
import { declOfNum, priceDollar } from '../../helpers/helpers';
import { Htag } from '../Htag/Htag';
import { Divider } from '../Divider/Divider';

import { ProductProps } from './Product.props';
import styles from './Product.module.css';

export const Product: FC<ProductProps> = ({ product, className, ...props }) => {
    return (
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
                {priceDollar(product.price)}
                {product.oldPrice &&
                    <Tag className={styles.oldPrice} color={TagColor.green}>
                        {priceDollar(product.price - product.oldPrice)}
                    </Tag>}
            </div>
            <div className={styles.credit}>{priceDollar(product.credit)}/<span className={styles.month}>month</span></div>
            <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
            <div className={styles.tags}>
                {product.categories.map((c) => <Tag key={c} className={styles.category} color={TagColor.ghost} >{c}</Tag>)}
            </div>
            <div className={styles.priceTitle}>price</div>
            <div className={styles.creditTitle}>credit</div>
            <div className={styles.ratingTitle}>
                {declOfNum(product.reviewCount, ['review', 'reviews', 'reviews'])}
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
                    arrow={ButtonArrow.right}
                    className={styles.reviewButton}
                >Reviews</Button>
            </div>
        </Card>
    )
}
