import meal from '../../images/meal.png';
import user from '../../images/ava.png';

import css from './Recipe.module.css';

const RecipePage = () => {

    return (
        <div className={css.recipePageContainer}>
            <img src={meal} alt="meal" className={css.recipeImg} />
            <h2 className={css.recipeTitle}>SALMON AVOCADO SALAD</h2>
            <div className={css.recipeMetrics}>
                <p className={css.category}>SeaFood</p>
                <p className={css.time}>40min</p>
            </div>
            <p className={css.recipeDescription}>
            Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette. Is a healthy salad recipe that’s big on nutrients and flavor.
            </p>
            <div className={css.userBlock}>
                <img src={user} alt="user" className={css.userImg} />
                <p className={css.userName}>Created by: <br /> <span>Jane Doe</span></p>
            </div>
        </div>
    )
};

export default RecipePage;
