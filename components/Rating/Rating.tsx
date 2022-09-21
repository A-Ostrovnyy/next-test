import { useRef, useEffect, useState, KeyboardEvent, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg'

export const Rating = forwardRef(({ isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<Array<JSX.Element>>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 0);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    const computeFocus = (rating: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!rating && i === 0) {
            return tabIndex ?? 0;
        }
        if (rating === i + 1) {
            return tabIndex ?? 0
        }
        return -1;
    };

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
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKeyDown}
                    ref={(r) => ratingArrayRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-valuenow={rating}
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-label={isEditable ? 'Set rating' : 'rating' + rating}
                    aria-invalid={!!error}
                >
                    <StarIcon />
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
    }, [rating, tabIndex])

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
