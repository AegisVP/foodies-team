import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import defaultAvatar from 'src/images/default-avatar.svg';
import spriteArrow from 'src/images/icons.svg#arrow';
import spriteChevronDown from 'src/images/icons.svg#chevron-down';
import spriteChevronUp from 'src/images/icons.svg#chevron-up';
import Spinner from '../Spinner';
import { logoutUserOperation } from 'src/redux/authUser/operations';

const UserMenu = ({ onLogoutOpen }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authUser.user);
    const loadingUser = useSelector(state => state.authUser.isLoading);

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        dispatch(logoutUserOperation());
        toggleMenu();
    };

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (loadingUser) {
        return <Spinner size="sm" />;
    }

    return (
        loadingUser === false && (
            <div className={css.component} ref={menuRef}>
                <button type="button" className={css.button} onClick={toggleMenu}>
                    <img alt="User avatar" className={css.avatar} src={user?.avatar || defaultAvatar} />

                    <span className={css.name}>{user?.name}</span>

                    <svg className={css.chevron}>
                        <use href={isOpen ? spriteChevronUp : spriteChevronDown} />
                    </svg>
                </button>

                {isOpen && (
                    <nav className={css.menu}>
                        <ul>
                            <li>
                                <NavLink to={`/user/${user?.id}`} onClick={toggleMenu}>
                                    Profile
                                </NavLink>
                            </li>

                            <li onClick={onLogoutOpen}>
                                <NavLink onClick={handleLogout}>
                                    Logout
                                    <svg>
                                        <use href={spriteArrow} />
                                    </svg>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        )
    );
};

export default UserMenu;
