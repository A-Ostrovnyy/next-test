import { FC } from 'react';
import cn from 'classnames';

import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.props';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';

export const ReviewForm: FC<ReviewFormProps> = ({ productId, className, ...props }) => {

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
    }

    return (
        <>
            <form className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    name="name"
                    placeholder="name"
                />
                <Input
                    className={styles.title}
                    name="title"
                    placeholder="Review title"
                />
                <div className={styles.rating}>
                    <span>Rating: </span>
                    <Rating rating={0} />
                </div>
                <TextArea
                    className={styles.description}
                    placeholder="Review text"
                />
                <div className={styles.submit}>
                    <Button
                        appearance={ButtonAppearance.primary}
                    // onClick={handleSubmit}
                    >
                        Send
                    </Button>
                    <span className={styles.info}>* We have review moderation</span>
                </div>
            </form>
            <div className={styles.success}>
                <div className={styles.successTitle}>Your review was sended</div>
                <div className={styles.successTitle}>
                    Thank you! Your review will be published after moderation
                </div>
                <CloseIcon className={styles.close} />
            </div>
        </>
    )
}
