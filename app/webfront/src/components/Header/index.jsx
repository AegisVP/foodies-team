import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../Logo';
import NavBar from '../NavBar';
import UserMenu from '../UserMenu';
import AuthenticationButtons from '../AuthenticationButtons';
import css from './Header.module.css';
import ROUTES from '../../navigation/routes.js';

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
  const location = useLocation();
  const isHome = matchPath(ROUTES.HOME, location.pathname);
  const isAddRecipe = matchPath(ROUTES.ADD_RECIPE_PAGE, location.pathname);
  const isCategory = matchPath(ROUTES.CATEGORIES, location.pathname);
  const isDarkTheme = isHome || isCategory;
  const isMobile = useIsMobile();
  const classes = clsx(
    css.component,
    {
      [css.light]: !isDarkTheme,
      [css.dark]: isDarkTheme,
    },
  );
  const theme = isDarkTheme ? 'dark' : 'light';
  const isAuthorised = false; // TODO replace with data from redux

  return (
    <header className={classes}>
      <Logo theme={theme} />

      {!isMobile &&
        <NavBar
          theme={theme}
          isMobile={false}
          isHome={isHome}
          isAddRecipe={isAddRecipe} />
      }


      <div className={css.right}>
        {!isAuthorised && <AuthenticationButtons isMobile={isMobile} />}

        {isAuthorised && <UserMenu />}

        {isMobile && isAuthorised &&
          <NavBar
            theme={theme}
            isMobile={true}
            isHome={isHome}
            isAddRecipe={isAddRecipe} />
        }
      </div>
    </header>
  );
};

export default Header;
