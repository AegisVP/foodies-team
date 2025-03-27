import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserProfileCard.module.css';
import { selectAuthUser } from 'src/redux/authUser/selectors';
import Icons from 'src/images/icons.svg';
import { updateUserAvatar } from 'src/redux/authUser/operations';

const UserProfileCard = ({ userProfile }) => {
    const authUser = useSelector(selectAuthUser);
    const fileFieldRef = useRef(null);
    const imgPreview = useRef(null);
    const dispatch = useDispatch();

    const handleAvatarChange = () => {
        console.log('avatar change');
        const avatar = fileFieldRef.current.files[0];
        if (!avatar) return;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(avatar);
        fileReader.addEventListener('load', function () {
            imgPreview.current.style.display = 'block';
            imgPreview.current.src = this.result;
        });
        dispatch(updateUserAvatar(avatar));
    };

    const ownUser = authUser?.id === userProfile.id;
    const profileFields = {
        email: 'Email',
        recipesCount: 'Added recipes',
        favoriteCount: 'Favorites',
        followersCount: 'Followers',
        followeesCount: 'Following',
    };
    const userInfo = Object.entries(userProfile).filter(([key]) => Object.keys(profileFields).includes(key));

    return (
        <div className={css.card}>
            <form className={css.userImgContainer} onClick={() => fileFieldRef.current.click()}>
                <input
                    ref={fileFieldRef}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    hidden
                    className="visually-hidden"
                    onChange={handleAvatarChange}
                />
                <img
                    ref={imgPreview}
                    src={userProfile.avatar ?? '/src/images/default-avatar.svg'}
                    alt="user"
                    className={css.userImg}
                />
                {ownUser && (
                    <div className={css.uploadAvatarBtn}>
                        <svg className={css.uploadAvatarIcon}>
                            <use href={Icons + '#plus'} />
                        </svg>
                    </div>
                )}
            </form>
            <h2 className={css.userName}>{userProfile.name}</h2>
            <ul className={css.userInfo}>
                {userInfo.map(([key, value]) => (
                    <p key={`${key}-${value}`} className={css.dataLabel}>
                        {profileFields[key]}:<span className={css.dataValue}>{value}</span>
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default UserProfileCard;
