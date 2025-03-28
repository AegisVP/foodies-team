import styles from './Spinner.module.css';

export default function Spinner({ fullPage = false, size = 'md' }) {
    // return (
    //     <div className={styles.backdrop}>
    //         <div className={styles.loader}></div>
    //     </div>
    // );

    const spinnerClasses = `${styles.loader} ${styles[size]} ${fullPage ? styles.fullPage : ''}`;

    return (
        <div className={fullPage ? styles.fullPageBackdrop : styles.backdrop}>
            <div className={spinnerClasses}></div>
        </div>
    );
}
