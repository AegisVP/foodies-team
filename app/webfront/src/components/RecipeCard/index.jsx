import css from './RecipeCard.module.css';
import spriteArrow from 'src/images/icons.svg#arrow';
import spriteHeart from 'src/images/icons.svg#heart';

const RecipeCard = ({ mealImage, title, description, userAvatar, userName, recipeId }) => {
    return (
        <div className={css.card}>
            <img src={mealImage} alt="meal" className={css.cardImg} />
            <h2 className={css.cardTitle}>{title}</h2>
            <p className={css.cardDescription}>{description}</p>
            <div className={css.cardFooter}>
                <div className={css.userInfo}>
                    <img src={userAvatar} className={css.userImg} />
                    <p className={css.userName}>{userName}</p>
                </div>
                <div className={css.cardActions}>
                    <button className={css.cardBtn} aria-label="Add to favorite">
                        <svg>
                            <use href={spriteHeart} className={css.arrow}></use>
                        </svg>
                    </button>
                    <button className={css.cardBtn} aria-label="Go to details">
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
