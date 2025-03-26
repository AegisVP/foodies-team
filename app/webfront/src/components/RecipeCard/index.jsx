import css from './RecipeCard.module.css';
import heart from '../../images/heart.svg';
import arrow from '../../images/arrow.svg';

const RecipeCard = ({ mealImage, title, description, userAvatar, userName }) => {
    return (
        <div className={css.card}>
            <img src={mealImage} alt="meal" className={css.cardImg} />
            <h2 className={css.cardTitle}>{title}</h2>
            <p className={css.cardDescription}>{description}</p>
            <div className={css.cardFooter}>
                <div className={css.userInfo}>
                    <img src={userAvatar} alt="user" className={css.userImg} />
                    <p className={css.userName}>{userName}</p>
                </div>
                <div className={css.cardActions}>
                    <button className={css.cardBtn}>
                        <img src={heart} alt="favorite" />
                    </button>
                    <button className={css.cardBtn}>
                        <img src={arrow} alt="details" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
