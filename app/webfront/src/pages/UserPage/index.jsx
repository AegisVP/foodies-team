import { Suspense, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

import ROUTES from 'src/navigation/routes.js';
import css from './UserPage.module.css';
import { Loader } from 'src/components';
import UserProfileCard from 'src/components/UserProfile/UserProfileCard/UserProfileCard';
import { getUserInformation } from 'src/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from 'src/redux/authUser/selectors';
import { setProfile } from 'src/redux/user/slice';
import { selectUserProfile } from 'src/redux/user/selectors';

const UserPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userProfile = useSelector(selectUserProfile);
    const authUser = useSelector(selectAuthUser);
    const authUserId = authUser?.id;
    const ownUser = userProfile?.id === authUserId;

    useEffect(() => {
        if (!id && !authUserId) return;

        getUserInformation(id ?? authUserId).then(data => {
            dispatch(setProfile(data));
        });
    }, [authUserId, dispatch, id]);

    return userProfile ? (
        <div className={css.container}>
            <h1 className={css.title}>Profile</h1>
            <p className={css.description}>
                Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.{' '}
            </p>
            <UserProfileCard userProfile={userProfile} />
            {ownUser ? <span>[logout button]</span> : <span>[follow button]</span>}
            <ul style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <li>
                    <NavLink to={ROUTES.RECIPES}>My Recipes</NavLink>
                </li>
                {ownUser && (
                    <li>
                        <NavLink to={ROUTES.FAVORITES}>My Favorites</NavLink>
                    </li>
                )}
                <li>
                    <NavLink to={ROUTES.FOLLOWERS}>Followers</NavLink>
                </li>
                {ownUser && (
                    <li>
                        <NavLink to={ROUTES.FOLLOWING}>Following</NavLink>
                    </li>
                )}
            </ul>

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    ) : (
        <Loader />
    );
};

export default UserPage;
