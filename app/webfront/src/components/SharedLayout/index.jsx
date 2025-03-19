import Header from '../Header';
import Footer from '../Footer';
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
    return (
        <div className={css.container}>
            <Header />
            <main className={css.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default SharedLayout;
