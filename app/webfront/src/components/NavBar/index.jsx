import { NavLink } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';
import { replaceUrlParams } from 'src/utils/replaceUrlParams.js';
import css from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={css.nav}>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
            <NavLink to={ROUTES.ADD_RECIPE_PAGE}>Add recipe</NavLink>
            <NavLink to={replaceUrlParams(`${ROUTES.USER_PAGE}/${ROUTES.RECIPES}`, { id: 123 })}>Profile</NavLink>
        </nav>
    );
};

export default NavBar;
