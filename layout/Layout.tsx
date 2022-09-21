import { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import cn from 'classnames';

import { AppContextProvider, IAppContext } from '../context/app.context';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isSkipLinkVisible, setIsSkipLinkVisible] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsSkipLinkVisible(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkVisible(false);
    }

    return (
        <div className={styles.wrapper}>
            <a
                onFocus={handleFocus}
                tabIndex={1}
                className={cn(styles.skipLink, {
                    [styles.skipLinkVisible]: isSkipLinkVisible
                })}
                onKeyDown={handleKeyDown}
            >Go to content</a>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <main className={styles.body} tabIndex={0} ref={bodyRef} role='main' >
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function WithLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        )
    }
}
