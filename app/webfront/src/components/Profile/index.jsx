import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { replaceUrlParams } from 'src/utils/replaceUrlParams.js';
import ROUTES from 'src/navigation/routes.js';
import { logoutUser } from '../../api/auth';
import { logout } from '../../redux/authUser/slice';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Profile.module.css';

export default function Profile() {
    const isAuthenticated = useSelector((state) => state.authUser.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logoutUser()
        .then((response) => {
            if (response.status !== undefined && response.status !== 200) {
                console.error('Logout error:', response);
            } else {
                dispatch(logout());
                setShowLoginModal(false);
                setDropdownOpen(false);
                navigate('/');
            }
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    const onSwitchToLogin = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const onSwitchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isAuthenticated) {
        return (
            <div>
                <div className={styles.authButtons}>
                    <button onClick={() => setShowLoginModal(true)}>Sign In</button>
                    <button onClick={() => setShowRegisterModal(true)}>Sign Up</button>
                </div>
                <div>
                    {showLoginModal && (
                        <Modal onClose={() => setShowLoginModal(false)}>
                            <h2>SIGN IN</h2>
                            <LoginForm
                                onClose={() => setShowLoginModal(false)}
                            />
                            <p className={styles.switchText}>
                                Don&apos;t have an account?
                                <button type="button" onClick={onSwitchToRegister} className={styles.switchBtn}>
                                    Create an account
                                </button>
                            </p>
                        </Modal>
                    )}
                    {showRegisterModal && (
                        <Modal onClose={() => setShowRegisterModal(false)}>
                            <h2>SIGN UP</h2>
                            <RegisterForm onClose={() => setShowRegisterModal(false)} />
                            <p className={styles.switchText}>
                                Already have an account?
                                <button type="button" onClick={onSwitchToLogin} className={styles.switchBtn}>
                                    Sign In
                                </button>
                            </p>
                        </Modal>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.profileWrapper} ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)}>Profile ⌄</button>
                {dropdownOpen && (
                    <ul className={styles.dropdown}>
                        <li>
                            <NavLink to={replaceUrlParams(`${ROUTES.USER_PAGE}/${ROUTES.RECIPES}`, { id: 123 })}>
                                Profile
                            </NavLink>
                        </li>
                        <li onClick={() => setShowLogoutModal(true)}>Logout</li>
                    </ul>
                )}
            </div>
            {showLogoutModal && (
                <Modal onClose={() => setShowLogoutModal(false)}>
                    <h2>ARE YOU LOGGING OUT?</h2>
                    <p>You can log back in at any time.</p>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
}
