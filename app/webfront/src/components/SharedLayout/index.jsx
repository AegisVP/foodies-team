import Header from '../Header';
import Footer from '../Footer';
import ROUTES from '../../navigation/routes.js';
import css from './SharedLayout.module.css';
import { matchPath, useLocation } from 'react-router-dom';

const SharedLayout = ({ children }) => {
    const location = useLocation();

    const isHome = matchPath(ROUTES.HOME, location.pathname);
    const isCategory = matchPath(ROUTES.CATEGORIES, location.pathname);

    const hideHeader = isHome || isCategory;

    return (
        <div className={css.container}>
            <div className={css.paddingContainer}>
                {!hideHeader && <Header />}

                <main className={css.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default SharedLayout;
