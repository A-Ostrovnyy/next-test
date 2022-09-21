import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg';
import styles from './Advantages.module.css';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            {
                advantages.map(({ _id, title, description }) => (
                    <div key={_id} className={styles.advantage}>
                        <CheckIcon />
                        <div className={styles.title}>{title}</div>
                        <hr className={styles.vLine} />
                        <div>{description}</div>
                    </div>
                ))
            }
        </div>
    )
}
