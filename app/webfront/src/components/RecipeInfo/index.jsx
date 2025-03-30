import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { selectFavoriteRecipesId } from 'src/redux/authUser/selectors';
import { selectCurrentRecipe, selectIsRecipesLoading } from 'src/redux/recipes/selectors';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from 'src/redux/authUser/operations';
import { getRecipeById } from 'src/redux/recipes/operations';
import { resetCurrentRecipe } from 'src/redux/recipes/slice';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import ROUTES from 'src/navigation/routes';

import RecipeMainInfo from '../RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients';
import RecipePreparation from '../RecipePreparation';
import Loader from '../Loader';

import css from './RecipeInfo.module.css';

const RecipeInfo = ({ setCustomBreadcrumbs, onUserAvatarClick }) => {
    const { id } = useParams();
    const { state } = useLocation();
    const dispatch = useDispatch();

    const isRecipesLoading = useSelector(selectIsRecipesLoading);
    const recipe = useSelector(selectCurrentRecipe);
    const favoritesIds = useSelector(selectFavoriteRecipesId);

    useEffect(() => {
        if (id && !isRecipesLoading && !recipe) {
            dispatch(getRecipeById(id));
        }
    }, [dispatch, recipe, id, isRecipesLoading]);

    useEffect(() => {
        if (recipe && setCustomBreadcrumbs) {
            setCustomBreadcrumbs([
                { label: 'Home', path: ROUTES.HOME },
                { label: 'Recipes', path: state?.from ? state.from : ROUTES.HOME },
                { label: recipe.title, path: replaceUrlParams(ROUTES.RECIPE_PAGE, { id }) },
            ]);
        }
    }, [id, recipe, setCustomBreadcrumbs, state]);

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

    const addToFavorite = () => {
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
                        <RecipeMainInfo recipe={recipe} onUserAvatarClick={onUserAvatarClick} />
                        <RecipeIngredients ingredients={recipe.ingredients} />
                        <RecipePreparation
                            instructions={recipe.instructions}
                            isFavorite={favoritesIds.includes(id)}
                            onFavoriteToggle={addToFavorite}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeInfo;
