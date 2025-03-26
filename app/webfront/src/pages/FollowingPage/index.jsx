import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FollowerItem from 'src/components/FollowerItem';
import { selectIsMobile, selectIsTablet } from 'src/redux/common/selectors.js';
import { getFollowees } from 'src/redux/user/operations.js';
import { selectFollowees } from 'src/redux/user/selectors.js';

const FollowingPage = () => {
    const dispatch = useDispatch();
    const followees = useSelector(selectFollowees);
    const isMobile = useSelector(selectIsMobile);
    const isTablet = useSelector(selectIsTablet);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getFollowees(id));
        }
    }, [dispatch, id]);

    return (
        <div>
            {followees.map(followee => {
                return (
                    <FollowerItem
                        key={followee.id}
                        avatar={followee.avatar}
                        id={followee.id}
                        isFollowing={true}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        recipes={followee.recipes}
                        recipesCount={followee.recipesCount}
                        username={followee.name}
                    />
                );
            })}
        </div>
    );
};

export default FollowingPage;
