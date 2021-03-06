import { FC, FunctionComponent } from 'react';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <div className={styles.body} >
                {children}
            </div>
            <Footer className={styles.footer} />
        </div>
    )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function WithLayoutComponent (props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        )
    }
}
