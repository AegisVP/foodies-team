import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';
import spriteX from 'src/images/icons.svg#x';
import css from './NavBar.module.css';
import Logo from '../Logo';

const NavBar = ({ isAddRecipe, isHome, isMobile, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };
    const classes = clsx(css.component, {
        [css.light]: theme === 'light',
        [css.dark]: theme === 'dark',
    });

    return (
        <nav className={classes}>
            {isMobile && (
                <button aria-label="Open menu" className={css['open-button']} type="button" onClick={toggleMenu}>
                    <span />
                    <span />
                    <span />
                    <span />
                </button>
            )}

            <div className={clsx(css.menu, { [css.open]: isOpen })}>
                {isMobile && (
                    <div className={css['menu-header']}>
                        <Logo theme="dark" />

                        <button
                            aria-label="Close menu"
                            type="button"
                            className={css['close-button']}
                            onClick={toggleMenu}
                        >
                            <svg>
                                <use href={spriteX} />
                            </svg>
                        </button>
                    </div>
                )}

                <nav>
                    <ul className={css['nav-list']}>
                        <li className={clsx(css['nav-item'], { [css.active]: isHome })}>
                            <NavLink to={ROUTES.HOME}>Home</NavLink>
                        </li>

                        <li className={clsx(css['nav-item'], { [css.active]: isAddRecipe })}>
                            <NavLink to={ROUTES.ADD_RECIPE_PAGE}>Add recipe</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    isAddRecipe: PropTypes.bool,
    isHome: PropTypes.bool,
    isMobile: PropTypes.bool,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default NavBar;
