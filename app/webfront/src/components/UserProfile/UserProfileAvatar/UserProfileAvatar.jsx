import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import css from './UserProfileAvatar.module.css';
import Icons from 'src/images/icons.svg';
import { updateUserAvatar } from 'src/redux/authUser/operations';

const UserProfileAvatar = ({ userProfile, ownUser }) => {
    const fileFieldRef = useRef(null);
    const imgPreview = useRef(null);
    const dispatch = useDispatch();

    const handleAvatarClick = ownUser => {
        if (ownUser) {
            fileFieldRef.current.click();
        }
    };

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

    return (
        <form className={css.userImgContainer} onClick={() => handleAvatarClick(ownUser)}>
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
                className={css.userAvatar}
            />
            {ownUser && (
                <div className={css.uploadAvatarBtn}>
                    <svg className={css.uploadAvatarIcon}>
                        <use href={Icons + '#plus'} />
                    </svg>
                </div>
            )}
        </form>
    );
};

export default UserProfileAvatar;
