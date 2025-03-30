import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import css from 'src/components/Pagination/Pagination.module.css';
import { selectAuthUser } from 'src/redux/authUser/selectors';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowees } from 'src/redux/followees/operations.js';
import { setPage } from 'src/redux/followees/slice';
import { selectFollowees, selectIsLoading, selectPage, selectTotalPages } from 'src/redux/followees/selectors.js';

const FolloweesPage = () => {
    console.log('FolloweesPage start');
    const dispatch = useDispatch();
    const followees = useSelector(selectFollowees);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectIsLoading);
    const authUser = useSelector(selectAuthUser);
    const page = useSelector(selectPage);
    const totalPages = useSelector(selectTotalPages);
    const { id } = useParams();

    useEffect(() => {
        if (id && id === authUser?.id) {
            dispatch(getFollowees(page));
        }
    }, [dispatch, id, authUser]);

    function handlePageClick(selectedPage) {
        dispatch(setPage(selectedPage.selected + 1));
        dispatch(getFollowees(selectedPage.selected + 1))
    }

    console.log({ followees });

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
            )}
        </>
    );
};

export default FolloweesPage;
