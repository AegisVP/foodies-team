import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Modal from '../Modal';
import AuthModal from '../AuthModal';
import AuthenticationButtons from '../AuthenticationButtons';
import UserMenu from '../UserMenu';
import Button from '../Button';

import ROUTES from 'src/navigation/routes';
import { useAuthHook } from 'src/hooks/useAuthHook';
import { logoutUserOperation } from 'src/redux/authUser/operations';
import { selectIsAuthenticated } from 'src/redux/authUser/selectors';

import styles from './Profile.module.css';

export default function Profile({ isMobile }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
    } = useAuthHook();

    const handleLogout = () => {
        dispatch(logoutUserOperation());
        setShowLogoutModal(false);
        navigate(ROUTES.HOME);
    };

    if (!isAuthenticated) {
        return (
            <div>
                <AuthenticationButtons
                    isMobile={isMobile}
                    onLoginOpen={openLoginModal}
                    onRegisterOpen={openRegisterModal}
                />
                <AuthModal
                    isLoginModalOpen={isLoginModalOpen}
                    isRegisterModalOpen={isRegisterModalOpen}
                    openLoginModal={openLoginModal}
                    closeLoginModal={closeLoginModal}
                    openRegisterModal={openRegisterModal}
                    closeRegisterModal={closeRegisterModal}
                />
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
