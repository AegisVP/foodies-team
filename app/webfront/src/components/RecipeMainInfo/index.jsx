import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
    return (
        <div className={css.recipe}>
            <section className={css.recipePageHeader}>
                <h2 className={css.sectionTitle}>{recipe.title}</h2>
                <div className={css.recipeMetrics}>
                    <p className={css.category}>{recipe.category?.name}</p>
                    <p className={css.time}>{recipe.time} min</p>
                </div>
                <p className={css.recipeDescription}>{recipe.category?.description}</p>
                <div className={css.userBlock}>
                    <img src={recipe.owner?.avatar} alt="user" className={css.userImg} />
                    <p className={css.userName}>
                        Created by: <br /> <span>{recipe.owner?.name}</span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default RecipeMainInfo;
