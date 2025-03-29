import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteRecipes, removeFromFavorites } from '../../redux/favorites/operation.js';
import { selectFavorites, selectIsFavoritesLoading, selectFavoritesError } from '../../redux/favorites/selectors.js';
import { useShowError } from '../../hooks/useShowError.js';
import { Loader } from '../../components';
import Empty from '../../components/Empty';
import css from './MyFavoritesPage.module.css';
import RecipePagination from 'src/components/RecipePagination';
import OwnerRecipeCard from 'src/components/OwnerRecipeCard';

const MyFavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const isLoading = useSelector(selectIsFavoritesLoading);
    const error = useSelector(selectFavoritesError);

    useShowError(error);

    useEffect(() => {
        dispatch(getFavoriteRecipes({ page: 1 }));
    }, [dispatch]);

    return (
        <div className={css.container}>
            {isLoading && <Loader />}

            {!isLoading && favorites?.length === 0 && (
                <Empty message="You haven't added any recipes to favorites yet" />
            )}

            {!isLoading && favorites?.length > 0 && (
                <>
                    <ul className={css.recipeList}>
                        {favorites.map(recipe => (
                            <li key={recipe.id} className={css.recipeItem}>
                                <OwnerRecipeCard
                                    recipe={recipe}
                                    onDelete={id => {
                                        dispatch(removeFromFavorites(id));
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                    <RecipePagination variant="favorites" />
                </>
            )}
        </div>
    );
};

export default MyFavoritesPage;
