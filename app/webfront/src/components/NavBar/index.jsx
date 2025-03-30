import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Logo from '../Logo';

import ROUTES from 'src/navigation/routes.js';
import spriteX from 'src/images/icons.svg#x';
import { selectIsAuthenticated } from 'src/redux/authUser/selectors';


import css from './NavBar.module.css';

const NavBar = ({ isAddRecipe, isHome, isMobile, theme, openLoginModal }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const onHomeClick = () => {
        if (isMobile) {
            toggleMenu();
        }

        navigate(ROUTES.HOME);
    };

    const onAddRecipeClick = () => {
        if (isMobile) {
            toggleMenu();
        }

        if (isAuthenticated) {
            navigate(ROUTES.ADD_RECIPE_PAGE);
        } else {
            openLoginModal();
        }
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

                <nav className={css.nav}>
                    <ul className={css['nav-list']}>
                        <li>
                            <button className={clsx(css['nav-item'], { [css.active]: isHome })} onClick={onHomeClick}>
                                Home
                            </button>
                        </li>

                        <li>
                            <button
                                className={clsx(css['nav-item'], { [css.active]: isAddRecipe })}
                                onClick={onAddRecipeClick}
                            >
                                Add recipe
                            </button>
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
