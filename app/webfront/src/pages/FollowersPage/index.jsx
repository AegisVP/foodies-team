import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FollowerItem from 'src/components/FollowerItem';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowers } from 'src/redux/user/operations.js';
import { selectFollowers } from 'src/redux/user/selectors.js';

const FollowersPage = () => {
    const dispatch = useDispatch();
    const followers = useSelector(selectFollowers);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getFollowers(id));
        }
    }, [dispatch, id]);

    return (
        <div>
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
                        recipesCount={follower.recipesCount}
                        username={follower.name}
                    />
                );
            })}
        </div>
    );
};

export default FollowersPage;
