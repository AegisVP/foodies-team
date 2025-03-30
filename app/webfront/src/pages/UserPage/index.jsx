import { Suspense, useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Spinner from 'src/components/Spinner';
import ROUTES from 'src/navigation/routes.js';
import css from './UserPage.module.css';
import { Loader } from 'src/components';
import UserProfileCard from 'src/components/UserProfile/UserProfileCard/UserProfileCard';
import Button from 'src/components/Button';
import {
    followUser,
    getFavoriteRecipes,
    getFollowees,
    getFollowers,
    logoutUserOperation,
    unfollowUser,
} from 'src/redux/authUser/operations';
import { selectAuthUserFollowees, selectAuthUserId } from 'src/redux/authUser/selectors';
import { selectUserProfile, selectIsLoading } from 'src/redux/user/selectors';
import { getUserProfile } from 'src/redux/user/operations';

const PATHS = {
    recipes: 'recipes',
    favorites: 'favorites',
    following: 'following',
    followers: 'followers',
};

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userProfile = useSelector(selectUserProfile);
    const isProfileLoading = useSelector(selectIsLoading);
    const authUserId = useSelector(selectAuthUserId);
    const { followees } = useSelector(selectAuthUserFollowees);
    const path = window.location.pathname.split('/').at(-1);
    const currentTab = Object.keys(PATHS).find(tab => tab === path);
    const [ownUser, setOwnUser] = useState(id === authUserId);
    const [activetab, setActiveTab] = useState(null);
    const [isFollowee, setIsFollowee] = useState(false);

    // console.log({ isFollowing, followers,id });

    const handleLogout = () => {
        dispatch(logoutUserOperation());
        navigate('/');
    };

    const handleFollowClick = () => {
        if (isFollowee) {
            dispatch(unfollowUser(userProfile.id));
            return;
        }
        dispatch(followUser(userProfile.id));
    };

    useEffect(() => {
        setIsFollowee(!!followees?.find(followee => followee.id === id));
    }, [id, followees]);

    useEffect(() => {
        if (currentTab === undefined) {
            setActiveTab(PATHS.recipes);
            navigate(`/user/${id}/${PATHS.recipes}`, { replace: true });
            return;
        }
        if (!ownUser && (currentTab === PATHS.following || currentTab === PATHS.favorites)) {
            navigate(`/user/${id}/${PATHS.recipes}`, { replace: true });
            return;
        }
        setActiveTab(currentTab);
        navigate(`/user/${id}/${currentTab}`, { replace: true });
    }, [currentTab, navigate, id, ownUser]);

    useEffect(() => {
        if (!id && !authUserId) return;

        dispatch(getUserProfile(id ?? authUserId));
        dispatch(getFollowers(id ?? authUserId));
        dispatch(getFollowees());
        setOwnUser(id === authUserId);
        if (id === authUserId) {
            dispatch(getFavoriteRecipes());
        }
    }, [authUserId, dispatch, id]);

    return userProfile ? (
        <div className={css.component}>
            <div className={css.container}>
                <h1 className={css.title}>Profile</h1>
                <p className={css.description}>
                    Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
                </p>
                {userProfile ? <UserProfileCard userProfile={userProfile} /> : <Spinner />}
                {ownUser ? (
                    <Button label="Logout" theme="dark" onClick={handleLogout} fullWidth={true} />
                ) : (
                    <Button label={isFollowee ? 'Unfollow' : 'Follow'} onClick={handleFollowClick} fullWidth={true} />
                )}
            </div>

            <div>
                <ul className={css.tabs}>
                    <li className={clsx(css.tab, { [css.active]: activetab === PATHS.recipes })}>
                        <NavLink to={ROUTES.RECIPES} onClick={() => setActiveTab(PATHS.recipes)}>
                            {ownUser && 'My'} Recipes
                        </NavLink>
                    </li>
                    {ownUser && (
                        <li className={clsx(css.tab, { [css.active]: activetab === PATHS.favorites })}>
                            <NavLink to={ROUTES.FAVORITES} onClick={() => setActiveTab(PATHS.favorites)}>
                                My Favorites
                            </NavLink>
                        </li>
                    )}
                    <li className={clsx(css.tab, { [css.active]: activetab === PATHS.followers })}>
                        <NavLink to={ROUTES.FOLLOWERS} onClick={() => setActiveTab(PATHS.followers)}>
                            Followers
                        </NavLink>
                    </li>
                    {ownUser && (
                        <li className={clsx(css.tab, { [css.active]: activetab === PATHS.following })}>
                            <NavLink to={ROUTES.FOLLOWING} onClick={() => setActiveTab(PATHS.following)}>
                                Following
                            </NavLink>
                        </li>
                    )}
                </ul>

                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    ) : isProfileLoading ? (
        <Loader />
    ) : (
        <Navigate to={ROUTES.NOT_FOUND} />
    );
};

export default UserPage;
