import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Profile.module.css';
import AuthenticationButtons from '../AuthenticationButtons';
import UserMenu from '../UserMenu';
import Button from '../Button';
import { logoutUserOperation } from 'src/redux/authUser/operations';

export default function Profile({ isMobile }) {
    const isAuthenticated = useSelector(state => state.authUser.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUserOperation());
        setShowLogoutModal(false);
        navigate('/');
    };

    const onSwitchToLogin = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const onSwitchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    if (!isAuthenticated) {
        return (
            <div>
                <AuthenticationButtons
                    isMobile={isMobile}
                    onLoginOpen={() => setShowLoginModal(true)}
                    onRegisterOpen={() => setShowRegisterModal(true)}
                />
                <div>
                    {showLoginModal && (
                        <Modal onClose={() => setShowLoginModal(false)}>
                            <h2 className={styles.modalTitle}>SIGN IN</h2>
                            <LoginForm onClose={() => setShowLoginModal(false)} />
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
                            <h2 className={styles.modalTitle}>SIGN UP</h2>
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
            <UserMenu onLogoutOpen={() => setShowLogoutModal(true)} />
            {showLogoutModal && (
                <Modal onClose={() => setShowLogoutModal(false)}>
                    <h2 className={clsx(styles.modalTitle, styles.center, styles.modalTitleLogout)}>
                        ARE YOU LOGGING OUT?
                    </h2>
                    <p className={clsx(styles.modalText, styles.center)}>You can log back in at any time.</p>
                    <Button
                        onClick={handleLogout}
                        label="Logout"
                        theme="dark"
                        fullWidth
                        className={styles.logoutButton}
                    />
                    <Button onClick={() => setShowLogoutModal(false)} label="Cancel" fullWidth />
                </Modal>
            )}
        </div>
    );
}
