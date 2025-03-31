import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRecipesLoading, selectPopularRecipes, selectRecipesError } from 'src/redux/recipes/selectors';
import { selectFavoriteRecipesId } from 'src/redux/authUser/selectors';
import { addToFavorites, removeFavorite } from 'src/redux/authUser/operations';
import { getPopularRecipes } from 'src/redux/recipes/operations';

import RecipeCard from 'src/components/RecipeCard';
import { Loader } from 'src/components';

import css from './PopularRecipes.module.css';
import { useShowError } from 'src/hooks/useShowError';

const PopularRecipes = ({ onUserAvatarClick, onRecipeDetailsClick }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsRecipesLoading);
    const recipeFetchError = useSelector(selectRecipesError);
    const popularRecipes = useSelector(selectPopularRecipes);
    const favoritesIds = useSelector(selectFavoriteRecipesId);

    useShowError(recipeFetchError);

    useEffect(() => {
        if (!isLoading && !popularRecipes?.length) {
            dispatch(getPopularRecipes());
        }
    }, [isLoading, popularRecipes]);

    const handleToggleFavorite = recipeId => {
        try {
            dispatch(favoritesIds.includes(recipeId) ? removeFavorite(recipeId) : addToFavorites(recipeId));
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (isLoading) return <Loader />;

    if (!Array.isArray(popularRecipes) || !popularRecipes.length) {
        return (
            <div className={css.container}>
                <h2 className={css.title}>POPULAR RECIPES</h2>
                <p>No popular recipes found.</p>
            </div>
        );
    }

    return (
        <div className={css.container}>
            <h2 className={css.title}>POPULAR RECIPES</h2>
            <div className={css.grid}>
                {popularRecipes.map(recipe => {
                    if (!recipe?.id) return null;

                    return (
                        <RecipeCard
                            key={recipe.id}
                            recipeId={recipe.id}
                            mealImage={
                                recipe.thumb || recipe.preview || 'https://via.placeholder.com/300x200?text=No+Image'
                            }
                            title={recipe.title || 'Untitled Recipe'}
                            description={
                                recipe.description ||
                                recipe.instructions?.substring(0, 80) + '...' ||
                                'No description available'
                            }
                            userAvatar={recipe.owner?.avatar || 'https://via.placeholder.com/40'}
                            userName={recipe.owner?.name || 'Unknown Chef'}
                            onFavoriteToggle={() => handleToggleFavorite(recipe.id)}
                            isFavorite={favoritesIds.includes(recipe.id)}
                            onUserAvatarClick={() => onUserAvatarClick(recipe.owner.id)}
                            onRecipeDetailsClick={() => onRecipeDetailsClick(recipe.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PopularRecipes;
