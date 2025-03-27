import clsx from 'clsx';
import { Suspense, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';
import css from './UserPage.module.css';

import { Loader } from 'src/components';

const UserPage = () => {
    const [activetab, setActiveTab] = useState('recipes');

    return (
        <div className={css.component}>
            <div>
                <h1>My Profile</h1>
                <p>This is user profile page.</p>
            </div>

            <div>
                <ul className={css.tabs}>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'recipes' })}>
                        <Link to={ROUTES.RECIPES} onClick={() => setActiveTab('recipes')}>My Recipes</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'favorites' })}>
                        <Link to={ROUTES.FAVORITES} onClick={() => setActiveTab('favorites')}>My Favorites</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'followers' })}>
                        <Link to={ROUTES.FOLLOWERS} onClick={() => setActiveTab('followers')}>Followers</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'following' })}>
                        <Link to={ROUTES.FOLLOWING} onClick={() => setActiveTab('following')}>Following</Link>
                    </li>
                </ul>

                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default UserPage;
