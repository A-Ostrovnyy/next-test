import { useState } from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.props';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, className, isOpened, ...props }: ReviewFormProps): JSX.Element => {

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFormSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Something goes wrong');
            };
        } catch (err) {
            setError(err as string);
        }
    }

    const handleSuccessMessageClose = () => {
        setIsSuccess(false);
    }

    const handleErrorMessageClose = () => {
        setError('');
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} {...props}>
            <div className={cn(styles.reviewForm, className)}>
                <Input
                    {
                    ...register('name',
                        {
                            required: {
                                value: true,
                                message: 'Enter the name'
                            }
                        })
                    }
                    placeholder="Name"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input
                    className={styles.title}
                    {
                    ...register('title',
                        {
                            required: {
                                value: true,
                                message: 'Enter the title'
                            }
                        })
                    }
                    tabIndex={isOpened ? 0 : -1}
                    placeholder="Review title"
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Rating: </span>
                    <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <Rating
                                rating={field.value}
                                setRating={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                                isEditable
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Enter the rating'
                            }
                        }}
                    />
                </div>
                <TextArea
                    className={styles.description}
                    placeholder="Review text"
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    {
                    ...register('description',
                        {
                            required: {
                                value: true,
                                message: 'Enter description'
                            }
                        })
                    }
                />
                <div className={styles.submit}>
                    <Button
                        appearance={ButtonAppearance.primary}
                        tabIndex={isOpened ? 0 : -1}
                    >
                        Send
                    </Button>
                    <span className={styles.info}>* We have review moderation</span>
                </div>
            </div>
            {
                isSuccess &&
                <div className={cn(styles.success, styles.panel)}>
                    <div className={styles.successTitle}>Your review was sended</div>
                    <div className={styles.successTitle}>
                        Thank you! Your review will be published after moderation
                    </div>
                    <CloseIcon onClick={handleSuccessMessageClose} className={styles.close} />
                </div>
            }
            {
                error &&
                <div className={cn(styles.error, styles.panel)}>
                    Something goes wrong, please try again later
                    <CloseIcon onClick={handleErrorMessageClose} className={styles.close} />
                </div>
            }
        </form>
    )
}
