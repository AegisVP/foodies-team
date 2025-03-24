import clsx from 'clsx';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({
  ariaLabel,
  theme = 'light',
  label,
  fullWidth,
  onClick,
  href,
  icon,
  to,
  className,
}) => {
  const classes = clsx(
    css.component,
    {
      [css.light]: theme === 'light',
      [css.dark]: theme === 'dark',
      [css.fullWidth]: fullWidth,
      [css.noLabel]: icon && !label,
      [css.withIcon]: icon && label,
    },
    className,
  );

  if (href) {
    return (
      <a
        aria-label={ ariaLabel }
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer">
        { label }

        {icon &&
          (<svg className={css.socialIcon}>
            <use href={icon} />
          </svg>
        )}
      </a>
    );
  }

  if (to) {
    return (
      <NavLink
        aria-label={ ariaLabel }
        to={to}
        className={classes}>
        { label }

        {icon &&
          (<svg className={css.socialIcon}>
            <use href={icon} />
          </svg>
        )}
      </NavLink>
    );
  }

  return (
    <button
      aria-label={ ariaLabel }
      className={classes}
      type="button"
      onClick={onClick}>
      { label }

      {icon &&
        (<svg className={css.socialIcon}>
          <use href={icon} />
        </svg>
      )}
    </button>
  );
};

Button.propTypes = {
  ariaLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
