import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRecipesLoading, selectPopularRecipes, selectRecipesError } from 'src/redux/recipes/selectors';
import { selectFavoriteRecipesId } from 'src/redux/authUser/selectors';
import { addToFavorites, removeFromFavorites } from 'src/redux/authUser/operations';
import { getPopularRecipes } from 'src/redux/recipes/operations';

import RecipeCard from 'src/components/RecipeCard';
import { Loader } from 'src/components';

import css from './PopularRecipes.module.css';

const PopularRecipes = ({ onUserAvatarClick }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsRecipesLoading);
    const recipeFetchError = useSelector(selectRecipesError);
    const popularRecipes = useSelector(selectPopularRecipes) || [];
    const favoritesIds = useSelector(selectFavoriteRecipesId) || [];
    
    // Додаємо логування для відстеження стану
    console.log('PopularRecipes state:', { 
        isLoading, 
        popularRecipes: Array.isArray(popularRecipes) ? popularRecipes.length : popularRecipes, 
        favoritesIds 
    });
    
    useEffect(() => {
        console.log('Dispatching getPopularRecipes');
        
        // const fetchData = async () => {
        //     try {
        //         const resultAction = await dispatch(getPopularRecipes());
        //         console.log('getPopularRecipes result:', resultAction);
        //         // Перевіряємо, чи операція була успішною
        //         if (getPopularRecipes.fulfilled.match(resultAction)) {
        //             console.log('Fetched data successfully:', resultAction.payload);
        //         } else if (getPopularRecipes.rejected.match(resultAction)) {
        //             console.error('Failed to fetch data:', resultAction.error);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching popular recipes:", error);
        //     }
        // };
        
        // fetchData();

        if (isLoading || recipeFetchError || !!popularRecipes) {
            console.log("Not fetching popular recipes:", { isLoading, recipeFetchError, popularRecipes });
            return;
        }

        dispatch(getPopularRecipes());
    }, [dispatch]);
    
    const handleToggleFavorite = (recipeId) => {
        try {
            const isFavorite = favoritesIds.includes(recipeId);
            
            if (isFavorite) {
                dispatch(removeFromFavorites(recipeId));
            } else {
                dispatch(addToFavorites(recipeId));
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };
    
    if (isLoading) {
        return <Loader />;
    }
    
    if (!Array.isArray(popularRecipes) || popularRecipes.length === 0) {
        console.log('No popular recipes found or invalid data format');
        return (
            <div className={css.container}>
                <h2 className={css.title}>POPULAR RECIPES</h2>
                <p>No popular recipes found.</p>
            </div>
        );
    }
    
    return popularRecipes && (
        <div className={css.container}>
            <h2 className={css.title}>POPULAR RECIPES</h2>
            
            <div className={css.grid}>
                {popularRecipes.map(recipe => {
                    if (!recipe) {
                        console.log('Encountered null recipe item');
                        return null;
                    }
                    
                    return (
                        <RecipeCard
                            key={recipe.id}
                            mealImage={recipe.thumb || recipe.preview || 'https://via.placeholder.com/300x200?text=No+Image'}
                            title={recipe.title || 'Untitled Recipe'}
                            description={recipe.description || recipe.instructions?.substring(0, 80) + '...' || 'No description available'}
                            userAvatar={recipe.owner?.avatar || 'https://via.placeholder.com/40'}
                            userName={recipe.owner?.name || 'Unknown Chef'}
                            recipeId={recipe.id}
                            onFavoriteToggle={() => handleToggleFavorite(recipe.id)}
                            isFavorite={favoritesIds.includes(recipe.id)}
                            onUserAvatarClick={onUserAvatarClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PopularRecipes;
