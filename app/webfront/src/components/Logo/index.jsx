import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Logo.module.css';

const Logo = ({ theme }) => {
    const classes = clsx(
        css.logo,
        {
          [css.light]: theme === 'light',
          [css.dark]: theme === 'dark',
        },
      );

    return (
        <a href="/" className={classes} aria-label="Foodies">
            Foodies
        </a>
    );
};

Logo.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default Logo;
