import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';

import { Loader } from 'src/components';
import UserProfileCard from 'src/components/UserProfile/UserProfileCard/UserProfileCard';
import { useDispatch } from 'react-redux';
import { selectAuthUser } from 'src/redux/authUser/selectors';

const UserPage = () => {
    const dispatch = useDispatch();
    const user = dispatch(selectAuthUser);
    console.log({ user });
    return (
        <div>
            <h1>Profile</h1>
            <p>Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us. </p>
            <UserProfileCard />
            <span>[logout button]</span>
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
