import { FC } from 'react';
import cn from 'classnames';

import { TagProps, TagSize, TagColor } from './Tag.props';
import styles from './Tag.module.css';

export const Tag: FC<TagProps> = ({size = TagSize.medium, className, href, color = TagColor.ghost ,children, ...props}) => {
    const tagClassName = cn(styles.tag, className, {
        [styles.small]: size === TagSize.small,
        [styles.medium]: size === TagSize.medium,
        [styles.ghost]: color === TagColor.ghost,
        [styles.green]: color === TagColor.green,
        [styles.grey]: color === TagColor.grey,
        [styles.primary]: color === TagColor.primary,
        [styles.red]: color === TagColor.red,
    })
    return <div className={tagClassName} {...props}>
        {
            href ? <a href={href}>{children}</a> : <>{children}</>
        }
    </div>
}
