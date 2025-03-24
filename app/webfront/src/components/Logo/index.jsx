import css from './Logo.module.css';

const Logo = ({ color }) => {
    const colorClass = color === 'white' ? css.logo : `${css.logo} ${css.black}`;

    return (
        <a href="/" className={colorClass} aria-label="Foodies">
            Foodies
        </a>
    );
};

export default Logo;
