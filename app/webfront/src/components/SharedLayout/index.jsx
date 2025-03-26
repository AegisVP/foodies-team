// import Header from '../Header';
import Footer from '../Footer';
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
    return (
        <div className={css.container}>
            <div className={css.paddingContainer}>
                {/* <Header /> */}
                <main className={css.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default SharedLayout;
