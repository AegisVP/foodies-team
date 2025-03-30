import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RecipeInfo from 'src/components/RecipeInfo';
import AuthModal from 'src/components/AuthModal';

import { ROUTES } from 'src/navigation/routes';
import { selectIsAuthenticated } from 'src/redux/authUser/selectors';
import { useAuthHook } from 'src/hooks/useAuthHook';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';
import PopularRecipes from 'src/components/PopularRecipes';

const RecipePage = ({ setCustomBreadcrumbs }) => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
    } = useAuthHook();

    const onUserAvatarClick = id => {
        if (isAuthenticated) {
            navigate(replaceUrlParams(ROUTES.USER_PAGE, { id }));
        } else {
            openLoginModal();
        }
    };

    return (
        <>
            <RecipeInfo setCustomBreadcrumbs={setCustomBreadcrumbs} onUserAvatarClick={onUserAvatarClick} />
            <PopularRecipes onUserAvatarClick={onUserAvatarClick} />
            <AuthModal
                isLoginModalOpen={isLoginModalOpen}
                isRegisterModalOpen={isRegisterModalOpen}
                openLoginModal={openLoginModal}
                closeLoginModal={closeLoginModal}
                openRegisterModal={openRegisterModal}
                closeRegisterModal={closeRegisterModal}
            />
        </>
    );
};

export default RecipePage;
