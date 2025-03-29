import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory, selectSelectedArea, selectSelectedIngredients } from 'src/redux/common/selectors';
import { selectTotalPages, selectPage } from 'src/redux/recipes/selectors';
import { fetchRecipes, fetchOwnerRecipes } from 'src/redux/recipes/operations';
import { setPage } from 'src/redux/recipes/slice';
import css from './RecipePagination.module.css';
import { setFavoritePage } from 'src/redux/favorites/slice';
import { getFavoriteRecipes } from 'src/redux/favorites/operation';

const RecipePagination = ({ variant = 'all' }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedIngredients = useSelector(selectSelectedIngredients);
    const selectedCategory = useSelector(selectSelectedCategory);
    const totalPages = useSelector(selectTotalPages);
    const page = useSelector(selectPage);

    const dispatch = useDispatch();

    const handlePageClick = selectedPage => {
        const newPage = selectedPage.selected + 1;

        if (variant === 'owner') {
            dispatch(setPage(newPage));
            dispatch(
                fetchOwnerRecipes({
                    page: selectedPage.selected + 1,
                })
            );
        } else if (variant === 'favorites') {
            dispatch(setFavoritePage(newPage));
            dispatch(
                getFavoriteRecipes({
                    page: newPage,
                })
            );
        } else {
            dispatch(setPage(newPage));
            dispatch(
                fetchRecipes({
                    page: newPage,
                    category: selectedCategory?.id,
                    area: selectedArea?.value,
                    ingredients: selectedIngredients.map(ing => ing.value),
                })
            );
        }
    };

    return (
        <div>
            <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                pageCount={totalPages}
                onPageChange={handlePageClick}
                breakLabel={'...'}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                containerClassName={css.paginationContainer}
                pageClassName={css.paginationItem}
                pageLinkClassName={css.pageLink}
                activeClassName={css.paginationItemActive}
                breakClassName={css.break}
                breakLinkClassName={css.breakLink}
                forcePage={page - 1}
            />
        </div>
    );
};

export default RecipePagination;
