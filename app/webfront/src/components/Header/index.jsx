import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Logo from '../Logo';
import NavBar from '../NavBar';
import css from './Header.module.css';
import ROUTES from '../../navigation/routes.js';
import Profile from '../Profile';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(document.querySelector('body').getBoundingClientRect().width < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(document.querySelector('body').getBoundingClientRect().width < 768);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const Header = () => {
    const isAuthenticated = useSelector(state => state.authUser.isAuthenticated);
    const location = useLocation();
    const isHome = matchPath(ROUTES.HOME, location.pathname);
    const isAddRecipe = matchPath(ROUTES.ADD_RECIPE_PAGE, location.pathname);
    const isCategory = matchPath(ROUTES.CATEGORIES, location.pathname);
    const isDarkTheme = isHome || isCategory;
    const isMobile = useIsMobile();
    const classes = clsx(css.component, {
        [css.light]: !isDarkTheme,
        [css.dark]: isDarkTheme,
    });
    const theme = isDarkTheme ? 'dark' : 'light';

    return (
        <header className={classes}>
            <Logo theme={theme} />

            {!isMobile && <NavBar theme={theme} isMobile={false} isHome={isHome} isAddRecipe={isAddRecipe} />}

            <div className={css.right}>
                <Profile isMobile={isMobile} />

                {isMobile && isAuthenticated && (
                    <NavBar theme={theme} isMobile={true} isHome={isHome} isAddRecipe={isAddRecipe} />
                )}
            </div>
        </header>
    );
};

export default Header;
