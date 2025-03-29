import css from './Column.module.css';

const Column = ({children, title }) => {
    return (
        <div className={css.column}>
            <h4 className={css.title}>{title}</h4>
            {children}
        </div>
    );
};

export default Column;
