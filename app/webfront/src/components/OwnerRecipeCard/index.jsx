import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from 'src/navigation/routes';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';
import trashIcon from 'src/images/trash.svg';
import arrowIcon from 'src/images/arrow.svg';

import css from './OwnerRecipeCard.module.css';

const OwnerRecipeCard = ({ recipe, onDelete = () => {} }) => {
    const navigate = useNavigate();
    const { id, title, description, thumb } = recipe;
    const { pathname } = useLocation();

    return (
        <div className={css.card}>
            <img src={thumb} alt={title} className={css.image} />
            <div className={css.content}>
                <h3 className={css.title}>{title}</h3>
                <p className={css.description}>{description}</p>
            </div>
            <div className={css.actions}>
                <button
                    className={css.actionButton}
                    aria-label="Open recipe"
                    onClick={() =>
                        navigate(replaceUrlParams(ROUTES.RECIPE_PAGE, { id }), { state: { from: pathname } })
                    }
                >
                    <img src={arrowIcon} alt="Open" />
                </button>
                <button className={css.actionButton} aria-label="Delete recipe" onClick={() => onDelete(id)}>
                    <img src={trashIcon} alt="Delete" />
                </button>
            </div>
        </div>
    );
};

export default OwnerRecipeCard;
