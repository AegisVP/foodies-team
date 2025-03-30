import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cssPagination from 'src/components/RecipePagination/RecipePagination.module.css';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getUserFollowers } from 'src/redux/user/operations';
import { selectUserFollowers, selectIsLoading } from 'src/redux/user/selectors.js';
import { selectAuthUserId } from 'src/redux/authUser/selectors';

const FollowersPage = () => {
    const dispatch = useDispatch();
    const { page, pages, limit, followers } = useSelector(selectUserFollowers);
    const authUserId = useSelector(selectAuthUserId);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectIsLoading);
    const { id } = useParams();

    const handlePageClick = data => {
        dispatch(getUserFollowers({ owner: id, page: data.selected + 1, limit: limit }));
    };

    useEffect(() => {
        if (id) {
            console.log({ id });
            dispatch(getUserFollowers(id));
        }
    }, [dispatch, id]);

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
        <Empty
            message={`There are currently no followers ${
                id === authUserId ? 'on your account' : 'of this user'
            }. Please engage our visitors with interesting content and draw their attention to your profile.`}
        />
    );
};

export default FollowersPage;
