import { useSelector } from 'react-redux';
import css from './UserProfileCard.module.css';
import { selectAuthUser } from 'src/redux/authUser/selectors';
import UserProfileCardAvatar from '../UserProfileAvatar/UserProfileAvatar';
import UserProfileStats from '../UserProfileStats/UserProfileStats';
import Spinner from 'src/components/Spinner';

const UserProfileCard = ({ userProfile }) => {
    const authUser = useSelector(selectAuthUser);

    const ownUser = authUser?.id === userProfile.id;

    return (
        <div className={css.card}>
            {userProfile ? (
                <>
                    <UserProfileCardAvatar userProfile={userProfile} ownUser={ownUser} />
                    <h2 className={css.userName}>{userProfile.name}</h2>
                    <UserProfileStats userProfile={userProfile} ownUser={ownUser} />
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default UserProfileCard;
