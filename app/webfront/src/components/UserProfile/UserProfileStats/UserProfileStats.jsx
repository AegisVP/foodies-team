import css from './UserProfileStats.module.css';

const UserProfileStats = ({ userProfile, ownUser }) => {
    return (
        <ul className={css.userInfo}>
            <li className={css.dataLabel}>
                Email:<span className={css.dataValue}>{userProfile.email}</span>
            </li>
            <li className={css.dataLabel}>
                Added recipes:<span className={css.dataValue}>{userProfile.recipesCount}</span>
            </li>
            {ownUser && (
                <li className={css.dataLabel}>
                    Favorites:<span className={css.dataValue}>{userProfile.favoriteCount}</span>
                </li>
            )}
            <li className={css.dataLabel}>
                Followers:<span className={css.dataValue}>{userProfile.followersCount}</span>
            </li>
            {ownUser && (
                <li className={css.dataLabel}>
                    Following:<span className={css.dataValue}>{userProfile.followeesCount}</span>
                </li>
            )}
        </ul>
    );
};

export default UserProfileStats;
