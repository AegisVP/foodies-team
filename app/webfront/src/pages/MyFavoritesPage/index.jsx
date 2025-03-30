import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useShowError } from '../../hooks/useShowError.js';
import { Loader } from '../../components';
import Empty from '../../components/Empty';
import css from './MyFavoritesPage.module.css';
import cssPagination from 'src/components/RecipePagination/RecipePagination.module.css';
import OwnerRecipeCard from 'src/components/OwnerRecipeCard';
import {
    selectAuthUserError,
    selectAuthUserIsLoading,
    selectFavorites,
    selectFavoritesLimit,
    selectFavoritesPage,
    selectFavoritesTotalPages,
} from 'src/redux/authUser/selectors.js';
import { getFavoriteRecipes, removeFromFavorites } from 'src/redux/authUser/operations.js';
import ReactPaginate from 'react-paginate';

const MyFavoritesPage = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectFavoritesPage);
    const limit = useSelector(selectFavoritesLimit);
    const pages = useSelector(selectFavoritesTotalPages);
    const recipes = useSelector(selectFavorites);
    const isLoading = useSelector(selectAuthUserIsLoading);
    const error = useSelector(selectAuthUserError);

    useShowError(error);

    const handlePageClick = data => {
        dispatch(getFavoriteRecipes({ page: data.selected + 1, limit: limit }));
    };

    useEffect(() => {
        console.log('getting favorite recipes');
        dispatch(getFavoriteRecipes({ page: 1 }));
    }, [dispatch]);

    return (
        <div className={css.container}>
            {isLoading ? (
                <Loader />
            ) : recipes?.length > 0 ? (
                <>
                    <ul className={css.recipeList}>
                        {recipes.map(recipe => (
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

                    {pages > 1 && (
                        <ReactPaginate
                            previousLabel={null}
                            nextLabel={null}
                            pageCount={pages}
                            onPageChange={handlePageClick}
                            breakLabel={'...'}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            containerClassName={cssPagination.paginationContainer}
                            pageClassName={cssPagination.paginationItem}
                            pageLinkClassName={cssPagination.pageLink}
                            activeClassName={cssPagination.paginationItemActive}
                            breakClassName={cssPagination.break}
                            breakLinkClassName={cssPagination.breakLink}
                            forcePage={page - 1}
                        />
                    )}
                </>
            ) : (
                <Empty message="You haven't added any recipes to favorites yet" />
            )}
        </div>
    );
};

export default MyFavoritesPage;
