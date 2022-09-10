import { FC, useEffect, useState, KeyboardEvent, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg'

export const Rating = forwardRef(({ isEditable = false, rating, error, setRating, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<Array<JSX.Element>>(new Array(5).fill(<></>));

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if (e.code === 'Space' && setRating) {
            setRating(i);
        }
    }

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    key={i}
                    className={cn(styles.star, {
                        [styles.filed]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGElement>) => {
                            isEditable && handleSpace(i + 1, e);
                        }}
                    />
                </span>

            )
        });
        setRatingArray(updatedArray);
    };

    const changeDisplay = (index: number) => {
        if (isEditable) {
            constructRating(index);
        }
    };

    const onClick = (index: number) => {
        console.log('index: ', index);
        if (isEditable && setRating) {
            setRating(index);
        }
    };

    useEffect(() => {
        constructRating(rating);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating])

    return (
        <div
            className={cn(styles.ratingWrapper, {
                [styles.error]: error
            })}
            {...props}
            ref={ref}
        >
            {ratingArray.map((r, i) => <span key={i}>{r}</span>)}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})

Rating.displayName = 'Rating';
