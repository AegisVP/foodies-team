import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Empty from 'src/components/Empty';
import FollowerItem from 'src/components/FollowerItem';
import Loader from 'src/components/Loader';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowers } from 'src/redux/user/operations.js';
import { selectFollowers, selectIsLoading } from 'src/redux/user/selectors.js';

const FollowersPage = () => {
    const dispatch = useDispatch();
    const followers = useSelector(selectFollowers);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const isLoading = useSelector(selectIsLoading);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getFollowers(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {isLoading && <Loader />}

            {!isLoading && followers.length > 0 && (
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
            )}

            {!isLoading && followers.length === 0 && (
                <Empty message="There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile." />
            )}
        </>
    );
};

export default FollowersPage;
