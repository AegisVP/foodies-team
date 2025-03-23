import { NavLink } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';
import css from './NavBar.module.css';
import Profile from '../Profile';

const NavBar = () => {
    return (
        <nav className={css.nav}>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
            <NavLink to={ROUTES.ADD_RECIPE_PAGE}>Add recipe</NavLink>
            <Profile />
        </nav>
    );
};

export default NavBar;
