import css from './Footer.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import spriteFacebook from '../../images/icons.svg#facebook';
import spriteInstagram from '../../images/icons.svg#instagram';
import spriteYoutube from '../../images/icons.svg#youtube';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={clsx(css.contentContainer, css.upperContentContainer)}>
                <NavLink to="/" aria-label="Home" className={css.logoContainer}>
                    <p className={css.logoContent}>foodies</p>
                </NavLink>

                <ul className={css.socialLinksContainer}>
                    <li className={css.socialLinkItemContainer}>
                        <a
                            href="https://www.facebook.com/goITclub/"
                            aria-label="Go IT Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.socialLinkItem}
                        >
                            <svg className={css.socialIcon}>
                                <use href={spriteFacebook} />
                            </svg>
                        </a>
                    </li>
                    <li className={css.socialLinkItemContainer}>
                        <a
                            href="https://www.instagram.com/goitclub/"
                            aria-label="Go IT Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.socialLinkItem}
                        >
                            <svg className={css.socialIcon}>
                                <use href={spriteInstagram} />
                            </svg>
                        </a>
                    </li>
                    <li className={css.socialLinkItemContainer}>
                        <a
                            href="https://www.youtube.com/c/GoIT"
                            aria-label="Go IT Youtube"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.socialLinkItem}
                        >
                            <svg className={css.socialIcon}>
                                <use href={spriteYoutube} />
                            </svg>
                        </a>
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
