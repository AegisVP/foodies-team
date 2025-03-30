import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe, onUserAvatarClick }) => {
    return (
        <div className={css.recipe}>
            <section className={css.recipePageHeader}>
                <h2 className={css.sectionTitle}>{recipe.title}</h2>
                <div className={css.recipeMetrics}>
                    <p className={css.category}>{recipe.category?.name}</p>
                    <p className={css.time}>{recipe.time} min</p>
                </div>
                <p className={css.recipeDescription}>{recipe.category?.description}</p>
                <button className={css.userBlock} onClick={() => onUserAvatarClick(recipe.owner.id)}>
                    <img src={recipe.owner?.avatar} alt="user" className={css.userImg} />
                    <p className={css.userName}>
                        Created by: <br /> <span>{recipe.owner?.name}</span>
                    </p>
                </button>
            </section>
        </div>
    );
};

export default RecipeMainInfo;
