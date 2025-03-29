import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowees } from 'src/redux/user/operations.js';
import { selectFollowees, selectIsLoading } from 'src/redux/user/selectors.js';

const FolloweesPage = () => {
    console.log('FolloweesPage start');
    const dispatch = useDispatch();
    const followees = useSelector(selectFollowees);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectIsLoading);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getFollowees(id));
        }
    }, [dispatch, id]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            {!followees || followees.length === 0 ? (
                <Empty message="Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you." />
            ) : (
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
            )}
        </>
    );
};

export default FolloweesPage;
