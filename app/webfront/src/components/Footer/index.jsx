import css from './Footer.module.css';
import clsx from 'clsx';
import Logo from '../Logo';
import NetworkLinks from '../NetworkLinks';
import Copyright from '../Copyright';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={clsx(css.contentContainer, css.upperContentContainer)}>
                <div className={css.logoContainer}>
                    <Logo theme="light" />
                </div>
                <NetworkLinks />
            </div>

            <div className={css.separatorContainer}>
                <hr />
            </div>

            <Copyright />
        </footer>
    );
};

export default Footer;
