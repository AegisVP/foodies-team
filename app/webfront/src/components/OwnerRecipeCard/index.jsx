import { Link } from 'react-router-dom';
import css from './OwnerRecipeCard.module.css';
import trashIcon from '../../images/trash.svg';
import arrowIcon from '../../images/arrow.svg';

const OwnerRecipeCard = ({ recipe }) => {
    const { id, title, description, thumb } = recipe;

    return (
        <div className={css.card}>
            <img src={thumb} alt={title} className={css.image} />
            <div className={css.content}>
                <h3 className={css.title}>{title}</h3>
                <p className={css.description}>{description}</p>
            </div>
            <div className={css.actions}>
                <Link to={`/recipe/${id}`} className={css.actionButton} aria-label="Open recipe">
                    <img src={arrowIcon} alt="Open" />
                </Link>
                <button className={css.actionButton} aria-label="Delete recipe">
                    <img src={trashIcon} alt="Delete" />
                </button>
            </div>
        </div>
    );
};

export default OwnerRecipeCard;
