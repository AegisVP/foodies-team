import spriteArrow from 'src/images/icons.svg#arrow';
import spriteHeart from 'src/images/icons.svg#heart';

import css from './RecipeCard.module.css';
import { useSelector } from 'react-redux';
import { selectFavoriteRecipesId } from 'src/redux/authUser/selectors';
import clsx from 'clsx';

const RecipeCard = ({
    mealImage,
    title,
    description,
    userId,
    userAvatar,
    userName,
    recipeId,
    onUserAvatarClick = () => {},
    onRecipeDetailsClick = () => {},
    onFavoriteClick = () => {},
}) => {
    const favoritesIds = useSelector(selectFavoriteRecipesId);
    const isFav = favoritesIds.includes(recipeId);
    const classes = clsx(css.cardBtn, {
        [css.cardBtn]: isFav,
    });
    return (
        <div className={css.card}>
            <img src={mealImage} alt="meal" className={css.cardImg} />
            <h2 className={css.cardTitle}>{title}</h2>
            <p className={css.cardDescription}>{description}</p>
            <div className={css.cardFooter}>
                <button className={css.userInfo} onClick={() => onUserAvatarClick(userId)}>
                    <img src={userAvatar} className={css.userImg} />
                    <p className={css.userName}>{userName}</p>
                </button>
                <div className={css.cardActions}>
                    <button className={classes} aria-label="Toggle favorite" onClick={() => onFavoriteClick(recipeId)}>
                        <svg>
                            <use href={spriteHeart} className={css.arrow}></use>
                        </svg>
                    </button>
                    <button
                        className={css.cardBtn}
                        onClick={() => onRecipeDetailsClick(recipeId)}
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
