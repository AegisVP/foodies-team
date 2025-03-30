import { useNavigate, useLocation } from 'react-router-dom';
import ROUTES from 'src/navigation/routes';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';
import spriteArrow from 'src/images/icons.svg#arrow';
import spriteHeart from 'src/images/icons.svg#heart';

import css from './RecipeCard.module.css';

const RecipeCard = ({ 
    mealImage, 
    title, 
    description, 
    userAvatar, 
    userName, 
    recipeId, 
    onFavoriteToggle, 
    isFavorite,
    onUserAvatarClick 
}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className={css.card}>
            <img src={mealImage} alt="meal" className={css.cardImg} />
            <h2 className={css.cardTitle}>{title}</h2>
            <p className={css.cardDescription}>{description}</p>
            <div className={css.cardFooter}>
                <div className={css.userInfo}>
                    <button 
                        className={css.userImgButton}
                        onClick={() => onUserAvatarClick && onUserAvatarClick(recipe.owner?.id)}
                        aria-label="View chef profile"
                    >
                        <img src={userAvatar} className={css.userImg} alt={userName} />
                    </button>
                    <p className={css.userName}>{userName}</p>
                </div>
                <div className={css.cardActions}>
                    <button 
                        className={css.cardBtn} 
                        aria-label={isFavorite ? "Remove from favorite" : "Add to favorite"}
                        onClick={onFavoriteToggle}
                    >
                        <svg>
                            <use href={spriteHeart} className={css.arrow}></use>
                        </svg>
                    </button>
                    <button
                        className={css.cardBtn}
                        onClick={() =>
                            navigate(replaceUrlParams(ROUTES.RECIPE_PAGE, { id: recipeId }), {
                                state: { from: pathname },
                            })
                        }
                        aria-label="Go to details"
                    >
                        <svg>
                            <use href={spriteArrow} className={css.arrow}></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
