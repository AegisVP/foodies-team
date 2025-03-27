import css from './MainTitle.module.css';

const MainTitle = ({ title }) => {
    return <h2 className={css.title}>{title}</h2>;
};

export default MainTitle;
