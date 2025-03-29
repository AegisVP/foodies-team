import css from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients }) => {
    return (
        <section className={css.ingredientsBlock}>
            <h2 className={css.sectionTitle}>Ingredients:</h2>
            <ul className={css.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        <div className={css.ingredientsItem}>
                            <img
                                src={ingredient.image}
                                alt="ingredient"
                                className={css.ingredientsImg}
                            />
                            <div className={css.ingredientsInfo}>
                                <p className={css.ingredientsName}>{ingredient.name}</p>
                                <p className={css.ingredientsMeasure}>{ingredient.measure}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default RecipeIngredients;
