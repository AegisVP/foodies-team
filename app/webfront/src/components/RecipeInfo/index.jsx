import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipeDetails, selectIsRecipesLoading } from 'src/redux/recipes/selectors';
import { useParams } from 'react-router-dom';
import { selectFavoriteRecipesId } from 'src/redux/favorites/selectors';

import css from './RecipeInfo.module.css';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from 'src/redux/favorites/operation';
import { getRecipeById } from 'src/redux/recipes/operations';

import Button from '../Button';
import ROUTES from 'src/navigation/routes';

const RecipeInfo = ({ setCustomBreadcrumbs }) => {
    const { id } = useParams();
    const isRecipesLoading = useSelector(selectIsRecipesLoading);
    const recipe = useSelector(selectRecipeDetails);
    const favoritesIds = useSelector(selectFavoriteRecipesId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && !isRecipesLoading && !recipe) {
            dispatch(getRecipeById(id));
            dispatch(getFavoriteRecipes());
        }

        if (recipe && setCustomBreadcrumbs) {
            setCustomBreadcrumbs([
                { label: 'Home', path: ROUTES.HOME },
                { label: 'Recipes', path: ROUTES.RECIPES },
                { label: recipe.title, path: ROUTES.RECIPE_PAGE.replace(':id', id) },
            ]);
        }
    }, [dispatch, recipe, id, isRecipesLoading, setCustomBreadcrumbs]);

    const addTofavorite = () => {
        if (recipe) {
            const isFavorite = favoritesIds.includes(id);

            if (!isFavorite) {
                dispatch(addToFavorites(id))
                    .then(response => {
                        if (response.error) {
                            console.error('Failed to add to favorites:', response.error.message);
                        } else {
                            console.log('Recipe added to favorites successfully!');
                            dispatch(getFavoriteRecipes());
                        }
                    })
                    .catch(error => {
                        console.error('Error adding to favorites:', error);
                    });
            } else {
                dispatch(removeFromFavorites(id))
                    .then(response => {
                        if (response.error) {
                            console.error('Failed to remove from favorites:', response.error.message);
                        } else {
                            console.log('Recipe removed from favorites successfully!');
                            dispatch(getFavoriteRecipes());
                        }
                    })
                    .catch(error => {
                        console.error('Error removing from favorites:', error);
                    });
            }
        }
    };

    return (
        <>
            {!isRecipesLoading && recipe && (
                <div className={css.recipePageContainer}>
                    <img src={recipe.thumb} alt="meal" className={css.recipeImg} />
                    <div className={css.recipe}>
                        <section className={css.recipePageHeader}>
                            <h2 className={css.sectionTitle}>{recipe.title}</h2>
                            <div className={css.recipeMetrics}>
                                <p className={css.category}>{recipe.category.name}</p>
                                <p className={css.time}>{recipe.time} min</p>
                            </div>
                            <p className={css.recipeDescription}>{recipe.category.description}</p>
                            <div className={css.userBlock}>
                                <img src={recipe.owner.avatar} alt="user" className={css.userImg} />
                                <p className={css.userName}>
                                    Created by: <br /> <span>{recipe.owner.name}</span>
                                </p>
                            </div>
                        </section>
                        <section className={css.ingredientsBlock}>
                            <h2 className={css.sectionTitle}>Ingredients:</h2>
                            <ul className={css.ingredientsList}>
                                {recipe.ingredients.map((ingredient, index) => (
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
                        <section className={css.instructionsBlock}>
                            <h2 className={css.sectionTitle}>Recipe Preparation</h2>
                            <p className={css.instructionsList}>{recipe.instructions}</p>
                        </section>
                        <Button
                            onClick={addTofavorite}
                            label={favoritesIds.includes(id) ? 'Remove from favorites' : 'Add to favorites'}
                            theme="light"
                            fullWidth
                            className={css.favoriteButton}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeInfo;
