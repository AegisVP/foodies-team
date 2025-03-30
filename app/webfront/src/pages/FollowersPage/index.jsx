import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import css from 'src/components/Pagination/Pagination.module.css';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowers } from 'src/redux/followers/operations.js';
import { setPage } from 'src/redux/followers/slice';
import { selectFollowers, selectIsLoading, selectPage, selectTotalPages } from 'src/redux/followers/selectors.js';

const FollowersPage = () => {
    const dispatch = useDispatch();
    const followers = useSelector(selectFollowers);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectIsLoading);
    const page = useSelector(selectPage);
    const totalPages = useSelector(selectTotalPages);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            console.log({ id });
            dispatch(getFollowers({ id, page }));
        }
    }, [dispatch, id]);

    function handlePageClick(selectedPage) {
        dispatch(setPage(selectedPage.selected + 1));
        dispatch(getFollowers({ id, page: selectedPage.selected + 1 }));
    }

    console.log({ followers });

    return isLoading ? (
        <Loader />
    ) : followers?.length > 0 ? (
        <>
            <ul>
                {followers.map(follower => {
                    return (
                        <FollowerItem
                            key={follower.id}
                            avatar={follower.avatar}
                            id={follower.id}
                            isFollowing={follower.isFollowing}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            recipes={follower.recipes}
                            recipesCount={Number(follower.recipeCount)}
                            username={follower.name}
                        />
                    );
                })}
            </ul>

            {totalPages > 1 &&
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
            }
        </>
    ) : (
        <Empty message="There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile." />
    );
};

export default FollowersPage;
