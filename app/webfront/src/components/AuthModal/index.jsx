import Modal from '../Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './AuthModal.module.css';

const AuthModal = ({
    isLoginModalOpen,
    isRegisterModalOpen,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
}) => {
    const onSwitchToLogin = () => {
        openLoginModal();
        closeRegisterModal();
    };

    const onSwitchToRegister = () => {
        openRegisterModal();
        closeLoginModal();
    };
    return (
        <>
            {isLoginModalOpen && (
                <Modal onClose={closeLoginModal}>
                    <h2 className={styles.modalTitle}>SIGN IN</h2>
                    <LoginForm onClose={closeLoginModal} />
                    <p className={styles.switchText}>
                        Don&apos;t have an account?
                        <button type="button" onClick={onSwitchToRegister} className={styles.switchBtn}>
                            Create an account
                        </button>
                    </p>
                </Modal>
            )}
            {isRegisterModalOpen && (
                <Modal onClose={closeRegisterModal}>
                    <h2 className={styles.modalTitle}>SIGN UP</h2>
                    <RegisterForm onClose={closeRegisterModal} />
                    <p className={styles.switchText}>
                        Already have an account?
                        <button type="button" onClick={onSwitchToLogin} className={styles.switchBtn}>
                            Sign In
                        </button>
                    </p>
                </Modal>
            )}
        </>
    );
};

export default AuthModal;
