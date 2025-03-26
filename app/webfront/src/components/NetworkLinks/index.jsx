import css from './NetworkLinks.module.css';
import Button from 'src/components/Button';
import spriteFacebook from 'src/images/icons.svg#facebook';
import spriteInstagram from 'src/images/icons.svg#instagram';
import spriteYoutube from 'src/images/icons.svg#youtube';

const NetworkLinks = () => {
    return (
        <ul className={css.socialLinksContainer}>
            <li className={css.socialLinkItemContainer}>
                <Button href="https://www.facebook.com/goITclub/" ariaLabel="Go IT Facebook" icon={spriteFacebook} />
            </li>
            <li className={css.socialLinkItemContainer}>
                <Button href="https://www.instagram.com/goitclub/" ariaLabel="Go IT Instagram" icon={spriteInstagram} />
            </li>
            <li className={css.socialLinkItemContainer}>
                <Button href="https://www.youtube.com/c/GoIT" ariaLabel="Go IT Youtube" icon={spriteYoutube} />
            </li>
        </ul>
    );
};

export default NetworkLinks;
