import { useRouter } from 'next/router';
import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import cn from 'classnames';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.props';
import GlassIcon from './glass.svg';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

export const Search: FC<SearchProps> = ({ className, ...props }) => {
    const [search, stSearch] = useState<string>('');
    const router = useRouter();

    const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        stSearch(target.value);
    }

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        })
    }

    const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={cn(styles.search, className)} {...props}>
            <Input
                placeholder="Search..."
                onChange={handleSearchChange}
                value={search}
                className={styles.input}
                onKeyDown={handleKeyDown}
            />
            <Button
                appearance={ButtonAppearance.primary}
                className={styles.button}
                onClick={handleSearch}
                aria-label="Search"
            >
                <GlassIcon />
            </Button>
        </div>
    )
}
