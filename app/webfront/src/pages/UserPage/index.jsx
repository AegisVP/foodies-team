import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { logoutUserOperation } from 'src/redux/authUser/operations';
import Spinner from 'src/components/Spinner';
import ROUTES from 'src/navigation/routes.js';
import css from './UserPage.module.css';
import { Loader } from 'src/components';
import UserProfileCard from 'src/components/UserProfile/UserProfileCard/UserProfileCard';
import { getUserInformation } from 'src/api/user';
import { selectAuthUser } from 'src/redux/authUser/selectors';
import { setProfile } from 'src/redux/user/slice';
import { selectFollowees, selectFollowers, selectUserProfile } from 'src/redux/user/selectors';
import Button from 'src/components/Button';

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userProfile = useSelector(selectUserProfile);
    const loggedinUser = useSelector(selectAuthUser);
    const followers = useSelector(selectFollowers);
    const [activetab, setActiveTab] = useState('recipes');
    useSelector(selectFollowees);

    useEffect(() => {
        setActiveTab('recipes');
    }, [id]);

    const ownUser = userProfile?.id === loggedinUser?.id;

    if (!ownUser) {
        console.log('TODO: add follow/unfollow button');
    }

    const handleLogout = () => {
        dispatch(logoutUserOperation());
        navigate('/');
    };

    useEffect(() => {
        if (!id && !loggedinUser?.id) return;

        getUserInformation(id ?? loggedinUser?.id).then(data => {
            dispatch(setProfile(data));
        });
    }, [loggedinUser, dispatch, id]);

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
                    <Button
                        label={followers?.find(follower => follower.id === id) ? 'Unfollow' : 'Follow'}
                        fullWidth={true}
                    />
                )}
            </div>

            <div>
                <ul className={css.tabs}>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'recipes' })}>
                        <NavLink to={ROUTES.RECIPES} onClick={() => setActiveTab('recipes')}>
                            {ownUser && 'My'} Recipes
                        </NavLink>
                    </li>
                    {ownUser && (
                        <li className={clsx(css.tab, { [css.active]: activetab === 'favorites' })}>
                            <NavLink to={ROUTES.FAVORITES} onClick={() => setActiveTab('favorites')}>
                                My Favorites
                            </NavLink>
                        </li>
                    )}
                    <li className={clsx(css.tab, { [css.active]: activetab === 'followers' })}>
                        <NavLink to={ROUTES.FOLLOWERS} onClick={() => setActiveTab('followers')}>
                            Followers
                        </NavLink>
                    </li>
                    {ownUser && (
                        <li className={clsx(css.tab, { [css.active]: activetab === 'following' })}>
                            <NavLink to={ROUTES.FOLLOWING} onClick={() => setActiveTab('following')}>
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
    ) : (
        <Loader />
    );
};

export default UserPage;
