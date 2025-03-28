import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectFavoriteRecipesId } from 'src/redux/favorites/selectors';
import { selectCurrentRecipe, selectIsRecipesLoading } from 'src/redux/recipes/selectors';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from 'src/redux/favorites/operation';
import { getRecipeById } from 'src/redux/recipes/operations';
import { resetCurrentRecipe } from 'src/redux/recipes/slice';

import ROUTES from 'src/navigation/routes';

import RecipeMainInfo from '../RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients';
import RecipePreparation from '../RecipePreparation';

import css from './RecipeInfo.module.css';
import { Loader } from '..';

const RecipeInfo = ({ setCustomBreadcrumbs }) => {
    const { id } = useParams();
    const isRecipesLoading = useSelector(selectIsRecipesLoading);
    const recipe = useSelector(selectCurrentRecipe);
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

    useEffect(() => {
        return () => {
            dispatch(resetCurrentRecipe());
        };
    }, [dispatch]);

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
            {isRecipesLoading && <Loader />}
            {!isRecipesLoading && recipe && (
                <div className={css.recipePageContainer}>
                    <div className={css.recipeImgContainer}>
                        <img src={recipe.thumb} alt="meal" className={css.recipeImg} />
                    </div>
                    <div className={css.recipe}>
                        <RecipeMainInfo recipe={recipe} />
                        <RecipeIngredients ingredients={recipe.ingredients} />
                        <RecipePreparation
                            instructions={recipe.instructions}
                            isFavorite={favoritesIds.includes(id)}
                            onFavoriteToggle={addTofavorite}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeInfo;
