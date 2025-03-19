import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';

import { Loader } from 'src/components';

const UserPage = () => {
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
