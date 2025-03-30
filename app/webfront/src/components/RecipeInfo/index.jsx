import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectFavoriteRecipesId } from 'src/redux/favorites/selectors';
import { selectCurrentRecipe, selectIsRecipesLoading } from 'src/redux/recipes/selectors';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from 'src/redux/favorites/operation';
import { getRecipeById } from 'src/redux/recipes/operations';
import { resetCurrentRecipe } from 'src/redux/recipes/slice';
import { selectUserId } from 'src/redux/authUser/selectors';

import ROUTES from 'src/navigation/routes';

import RecipeMainInfo from '../RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients';
import RecipePreparation from '../RecipePreparation';

import css from './RecipeInfo.module.css';
import { Loader } from '..';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

const RecipeInfo = ({ setCustomBreadcrumbs }) => {
    const { id } = useParams();
    const isRecipesLoading = useSelector(selectIsRecipesLoading);
    const recipe = useSelector(selectCurrentRecipe);
    const favoritesIds = useSelector(selectFavoriteRecipesId);
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && !isRecipesLoading && !recipe) {
            dispatch(getRecipeById(id));
        }
    }, [dispatch, recipe, id, isRecipesLoading]);

    useEffect(() => {
        if (recipe && setCustomBreadcrumbs) {
            setCustomBreadcrumbs([
                { label: 'Home', path: ROUTES.HOME },
                { label: 'Recipes', path: replaceUrlParams(ROUTES.USER_PAGE, { id: userId }) },
                { label: recipe.title, path: replaceUrlParams(ROUTES.RECIPE_PAGE, { id }) },
            ]);
        }
    }, [id, recipe, setCustomBreadcrumbs]);

    useEffect(() => {
        if (!isRecipesLoading && !favoritesIds) {
            dispatch(getFavoriteRecipes());
        }
    }, [dispatch, isRecipesLoading, favoritesIds]);

    useEffect(() => {
        return () => {
            setCustomBreadcrumbs(null);
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
