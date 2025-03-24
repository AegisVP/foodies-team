import css from './Copyright.module.css';

const Copyright = () => {
    return (
        <div className={css.contentContainer}>
            <p className={css.copyriteContent}>@{new Date().getFullYear()}, Foodies. All rights reserved</p>
        </div>
    );
};

export default Copyright;
