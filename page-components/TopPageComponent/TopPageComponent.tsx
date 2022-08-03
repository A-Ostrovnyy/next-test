import { TopPageComponentProps } from './TopPageComponent.props';

import styles from './TopPageComponent.module.css';


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
    return (
        <div>{products && products.length}</div>
    )
}
