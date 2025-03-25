import { Suspense, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers, getFollowees } from 'src/redux/user/operations.js';
import FollowerItem from 'src/components/FollowerItem';
import ROUTES from 'src/navigation/routes.js';

import { Loader } from 'src/components';

const UserPage = () => {
    const dispatch = useDispatch();
    const followers = useSelector((state) => state.user.followers);
    const followees = useSelector((state) => state.user.followees);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getFollowers(id));
            dispatch(getFollowees(id));
        }
    }, [dispatch, id]);

    return (
        <div>
            <h1>My Profile</h1>
            <p>This is user profile page.</p>
            <ul style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <li>
                    <Link to={ROUTES.RECIPES}>My Recipes</Link>
                </li>
                <li>
                    <Link to={ROUTES.FAVORITES}>My Favorites</Link>
                </li>
                <li>
                    <Link to={ROUTES.FOLLOWERS}>Followers</Link>
                </li>
                <li>
                    <Link to={ROUTES.FOLLOWING}>Following</Link>
                </li>
            </ul>

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default UserPage;
