import { FC } from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.props';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm: FC<ReviewFormProps> = ({ productId, className, ...props }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

    const handleFormSubmit = (data: IReviewForm) => {

    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    >
                        Send
                    </Button>
                    <span className={styles.info}>* We have review moderation</span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>Your review was sended</div>
                <div className={styles.successTitle}>
                    Thank you! Your review will be published after moderation
                </div>
                <CloseIcon className={styles.close} />
            </div>
        </form>
    )
}
