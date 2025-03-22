import Logo from '../Logo';
import NavBar from '../NavBar';
import css from './Header.module.css';

const Header = () => {
    return (
        <div className={css.container}>
            <Logo/>
            <NavBar />
        </div>
    );
};

export default Header;
