import clsx from 'clsx';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import css from './AuthenticationButtons.module.css';

const AuthenticationButtons = ({ isMobile }) => {
  function openSignInModal() {
    //TODO
  }

  function openSignUpModal() {
    //TODO
  }

  return (
    <div className={css.component}>
      <Button
        className={clsx(css.button, css['sign-in'], { [css.mobile]: isMobile })}
        label="Sign in"
        onClick={openSignInModal} />

      <Button
        className={clsx(css.button, css['sign-up'], { [css.mobile]: isMobile })}
        label="Sign up"
        theme="dark"
        onClick={openSignUpModal} />
    </div>
  );
};

AuthenticationButtons.propTypes = {
  isMobile: PropTypes.bool,
};

export default AuthenticationButtons;
