import css from './IngredientCard.module.css';

const IngredientCard = ({ imageUrl, title, subtitle, onDelete }) => {
    return (
        <div className={css.row}>
            <div className={css.imageContainer}>
                <img src={imageUrl} alt={title} className={css.image} />
            </div>
            <div className={css.column}>
                <p className={css.title}>{title}</p>
                <p className={css.subtitle}>{subtitle}</p>
            </div>
            {/* TODO: add delete icon */}
            <button className={css.deleteBtn} onClick={onDelete}>
                -
            </button>
        </div>
    );
};

export default IngredientCard;
