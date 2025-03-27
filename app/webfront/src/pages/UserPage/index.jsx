import clsx from 'clsx';
import { Suspense, useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';
import css from './UserPage.module.css';

import { Loader } from 'src/components';

const UserPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('recipes');

    useEffect(() => {
        setActiveTab('recipes');
    }, [id]);

    return (
        <div className={css.component}>
            <div>
                <h1>My Profile</h1>
                <p>This is user profile page.</p>
            </div>

            <div>
                <ul className={css.tabs}>
                    <li className={clsx(css.tab, { [css.active]: activeTab === 'recipes' })}>
                        <Link to={ROUTES.RECIPES} onClick={() => setActiveTab('recipes')}>My Recipes</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activeTab === 'favorites' })}>
                        <Link to={ROUTES.FAVORITES} onClick={() => setActiveTab('favorites')}>My Favorites</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activeTab === 'followers' })}>
                        <Link to={ROUTES.FOLLOWERS} onClick={() => setActiveTab('followers')}>Followers</Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activeTab === 'following' })}>
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
