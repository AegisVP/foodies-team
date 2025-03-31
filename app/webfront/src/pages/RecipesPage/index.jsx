import { useDispatch, useSelector } from 'react-redux';
// import { selectRecipes, selectIsRecipesLoading, selectRecipesError } from 'src/redux/recipes/selectors';
import { selectUserRecipes, selectIsLoading, selectError } from 'src/redux/user/selectors';
import { getUserRecipes } from 'src/redux/user/operations';
import { useShowError } from 'src/hooks/useShowError.js';
import css from './RecipesPage.module.css';
import cssPagination from 'src/components/RecipePagination/RecipePagination.module.css';
import OwnerRecipeCard from 'src/components/OwnerRecipeCard';
import { Loader } from 'src/components';
import Empty from 'src/components/Empty';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const RecipesPage = () => {
    const dispatch = useDispatch();
    const { page, limit, pages, recipes } = useSelector(selectUserRecipes);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const { id } = useParams();

    useShowError(error);

    const handlePageClick = data => {
        dispatch(getUserRecipes({ owner: id, page: data.selected + 1, limit: limit }));
    };

    return (
        <div className={css.container}>
            {isLoading && <Loader />}

            {!isLoading && recipes?.length === 0 && <Empty message="You haven't added any recipes yet" />}

            {!isLoading && recipes?.length > 0 && (
                <>
                    <ul className={css.recipeList}>
                        {recipes.map(recipe => (
                            <li key={recipe.id} className={css.recipeItem}>
                                <OwnerRecipeCard recipe={recipe} />
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
            )}
        </div>
    );
};

export default RecipesPage;
