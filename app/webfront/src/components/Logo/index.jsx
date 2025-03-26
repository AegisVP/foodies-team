import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Logo.module.css';
import { NavLink } from 'react-router-dom';

const Logo = ({ theme }) => {
    const classes = clsx(css.logo, {
        [css.light]: theme === 'light',
        [css.dark]: theme === 'dark',
    });

    return (
        <NavLink to="/" aria-label="Foodies" className={classes}>
            foodies
        </NavLink>
    );
};

Logo.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default Logo;
