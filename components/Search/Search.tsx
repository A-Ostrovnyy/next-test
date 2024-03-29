import { useRouter } from 'next/router';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import cn from 'classnames';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.props';
import GlassIcon from './glass.svg';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
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
        <form className={cn(styles.search, className)} {...props} role='search'>
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
        </form>
    )
}
