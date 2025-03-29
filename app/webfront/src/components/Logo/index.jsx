import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Logo.module.css';
import { NavLink } from 'react-router-dom';
import { setSelectedCategory, setSelectedIngredients, setSelectedArea } from 'src/redux/common/slice';
import { clearRecipes, setPage } from 'src/redux/recipes/slice';
import { useDispatch } from 'react-redux';

const Logo = ({ theme }) => {
    const classes = clsx(css.logo, {
        [css.light]: theme === 'light',
        [css.dark]: theme === 'dark',
    });

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedArea(null));
        dispatch(setSelectedIngredients([]));
        dispatch(setPage(1));
        dispatch(clearRecipes());
    };

    return (
        <NavLink to="/" aria-label="Foodies" className={classes} onClick={handleClick}>
            foodies
        </NavLink>
    );
};

Logo.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default Logo;
