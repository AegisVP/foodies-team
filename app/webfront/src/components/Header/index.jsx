import NavBar from '../NavBar';
import css from './Header.module.css';

const Header = () => {
    return (
        <div className={css.container}>
            <p>Logo</p>
            <NavBar />
        </div>
    );
};

export default Header;
