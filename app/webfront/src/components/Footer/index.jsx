import css from './Footer.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Button from 'src/components/Button';
import spriteFacebook from 'src/images/icons.svg#facebook';
import spriteInstagram from 'src/images/icons.svg#instagram';
import spriteYoutube from 'src/images/icons.svg#youtube';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={clsx(css.contentContainer, css.upperContentContainer)}>
                <NavLink to="/" aria-label="Home" className={css.logoContainer}>
                    <p className={css.logoContent}>foodies</p>
                </NavLink>

                <ul className={css.socialLinksContainer}>
                    <li className={css.socialLinkItemContainer}>
                        <Button
                            href="https://www.facebook.com/goITclub/"
                            ariaLabel="Go IT Facebook"
                            icon={spriteFacebook}
                        />
                    </li>
                    <li className={css.socialLinkItemContainer}>
                        <Button
                            href="https://www.instagram.com/goitclub/"
                            ariaLabel="Go IT Instagram"
                            icon={spriteInstagram}
                        />
                    </li>
                    <li className={css.socialLinkItemContainer}>
                        <Button href="https://www.youtube.com/c/GoIT" ariaLabel="Go IT Youtube" icon={spriteYoutube} />
                    </li>
                </ul>
            </div>

            <div className={css.separatorContainer}>
                <hr />
            </div>

            <div className={css.contentContainer}>
                <p className={css.copyriteContent}>@2024, Foodies. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
