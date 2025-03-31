import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import cssPagination from 'src/components/RecipePagination/RecipePagination.module.css';
import { useShowError } from 'src/hooks/useShowError';
import { getFollowees } from 'src/redux/authUser/operations';
import { selectAuthUserFollowees, selectAuthUserIsLoading, selectAuthUserError } from 'src/redux/authUser/selectors';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';

const FolloweesPage = () => {
    const dispatch = useDispatch();
    const { page, pages, limit, followees } = useSelector(selectAuthUserFollowees);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectAuthUserIsLoading);
    const error = useSelector(selectAuthUserError);

    useShowError(error);

    const handlePageClick = data => {
        dispatch(getFollowees({ page: data.selected + 1, limit: limit }));
    };

    return isLoading ? (
        <Loader />
    ) : (
        <>
            {!followees || followees.length === 0 ? (
                <Empty message="Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you." />
            ) : (
                <>
                    <ul>
                        {followees.map(followee => {
                            return (
                                <FollowerItem
                                    key={followee.id}
                                    avatar={followee.avatar}
                                    id={followee.id}
                                    isFollowing={followee.isFollowing}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                    recipes={followee.recipes}
                                    recipesCount={Number(followee.recipeCount)}
                                    username={followee.name}
                                />
                            );
                        })}
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
        </>
    );
};

export default FolloweesPage;
