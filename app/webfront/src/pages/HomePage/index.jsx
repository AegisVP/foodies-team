import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from 'src/navigation/routes';
import {
    selectSelectedCategory,
    selectCategories,
    selectTestimonials,
    selectCommonError,
    selectIsCommonLoading,
} from 'src/redux/common/selectors';
import { getCategories, getTestimonials } from 'src/redux/common/operations';
import { selectIsAuthenticated } from 'src/redux/authUser/selectors';
import { useShowError } from 'src/hooks/useShowError.js';
import { useAuthHook } from 'src/hooks/useAuthHook';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import Testimonials from 'src/components/Testimonials';
import Categories from 'src/components/Categories';
import Recipes from 'src/components/Recipes';
import Hero from 'src/components/Hero';
import AuthModal from 'src/components/AuthModal';

import css from './HomePage.module.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);
    const testimonials = useSelector(selectTestimonials);
    const selectedCategory = useSelector(selectSelectedCategory);

    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
    } = useAuthHook();

    const onAddRecipeClick = () => {
        if (isAuthenticated) {
            navigate(ROUTES.ADD_RECIPE_PAGE);
        } else {
            openLoginModal();
        }
    };

    const onUserAvatarClick = id => {
        if (isAuthenticated) {
            navigate(replaceUrlParams(ROUTES.USER_PAGE, { id }));
        } else {
            openLoginModal();
        }
    };

    const onRecipeDetailsClick = recipeId => {
        navigate(replaceUrlParams(ROUTES.RECIPE_PAGE, { id: recipeId }), {
            state: { from: pathname },
        });
    };

    useEffect(() => {
        if (!isCommonLoading) {
            if (!categories?.length) {
                dispatch(getCategories());
            }
            if (!testimonials?.length) {
                dispatch(getTestimonials());
            }
        }
    }, [dispatch, categories, testimonials, isCommonLoading]);

    useShowError(error);

    return (
        <div>
            <Hero className={css.hero} onAddRecipeClick={onAddRecipeClick} />
            {!isCommonLoading && selectedCategory && (
                <Recipes onUserAvatarClick={onUserAvatarClick} onRecipeDetailsClick={onRecipeDetailsClick} />
            )}
            {!isCommonLoading && !!categories?.length && !selectedCategory && <Categories items={categories} />}
            {!isCommonLoading && !!testimonials?.length && <Testimonials items={testimonials} type="testimonial" />}
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
};

export default HomePage;
