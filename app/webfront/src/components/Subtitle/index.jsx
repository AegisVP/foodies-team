import css from './Subtitle.module.css';

const Subtitle = ({ subtitle }) => {
    return <p className={css.subtitle}>{subtitle}</p>;
};

export default Subtitle;
