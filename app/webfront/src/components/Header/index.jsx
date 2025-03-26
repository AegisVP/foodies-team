import clsx from 'clsx';
import { useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from 'src/components/Logo';
import NavBar from 'src/components/NavBar';
import Profile from 'src/components/Profile';
import ROUTES from 'src/navigation/routes.js';
import { selectIsAuthenticated } from 'src/redux/authUser/selectors.js';
import { selectIsMobile } from 'src/redux/common/selectors.js';
import css from './Header.module.css';

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isMobile = useSelector(selectIsMobile);
  const location = useLocation();
  const isHome = matchPath(ROUTES.HOME, location.pathname);
  const isAddRecipe = matchPath(ROUTES.ADD_RECIPE_PAGE, location.pathname);
  const isCategory = matchPath(ROUTES.CATEGORIES, location.pathname);
  const isDarkTheme = isHome || isCategory;
  const classes = clsx(
    css.component,
    {
      [css.light]: !isDarkTheme,
      [css.dark]: isDarkTheme,
    },
  );
  const theme = isDarkTheme ? 'dark' : 'light';

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
        <Profile isMobile={isMobile} />

        {isMobile && isAuthenticated &&
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
