import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import clsx from 'clsx';
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
    const [activetab, setActiveTab] = useState('recipes');

    const authUserId = authUser?.id;
    const ownUser = userProfile?.id === authUserId;

    useEffect(() => {
        if (!id && !authUserId) return;

        getUserInformation(id ?? authUserId).then(data => {
            dispatch(setProfile(data));
        });
    }, [authUserId, dispatch, id]);

    return userProfile ? (
        <div className={css.component}>
            <div className={css.container}>
                <h1 className={css.title}>Profile</h1>
                <p className={css.description}>
                    Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with
                    us.{' '}
                </p>
                <UserProfileCard userProfile={userProfile} />
                {ownUser ? <span>[logout button]</span> : <span>[follow button]</span>}
            </div>

            <div>
                <ul className={css.tabs}>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'recipes' })}>
                        <Link to={ROUTES.RECIPES} onClick={() => setActiveTab('recipes')}>
                            My Recipes
                        </Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'favorites' })}>
                        <Link to={ROUTES.FAVORITES} onClick={() => setActiveTab('favorites')}>
                            My Favorites
                        </Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'followers' })}>
                        <Link to={ROUTES.FOLLOWERS} onClick={() => setActiveTab('followers')}>
                            Followers
                        </Link>
                    </li>
                    <li className={clsx(css.tab, { [css.active]: activetab === 'following' })}>
                        <Link to={ROUTES.FOLLOWING} onClick={() => setActiveTab('following')}>
                            Following
                        </Link>
                    </li>
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
