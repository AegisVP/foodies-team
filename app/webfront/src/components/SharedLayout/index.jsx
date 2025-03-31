import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ROUTES from '../../navigation/routes.js';
import { setIsMobile, setIsTablet } from '../../redux/common/slice';
import css from './SharedLayout.module.css';
import { useBreadcrumbs } from 'src/hooks/useBreadcrumbs';
import Breadcrumbs from 'src/components/Breadcrumbs';

const SharedLayout = ({ children, customBreadcrumbs }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const breadcrumbs = useBreadcrumbs(customBreadcrumbs);

    const isHome = matchPath(ROUTES.HOME, location.pathname);
    const isCategory = matchPath(ROUTES.CATEGORIES, location.pathname);
    const hideHeader = isHome || isCategory;
    const showBreadcrumbs = !isHome && breadcrumbs.length > 0;

    useEffect(() => {
        const handleResize = () => {
            const width = document.querySelector('body').getBoundingClientRect().width;
            dispatch(setIsMobile(width < 768));
            dispatch(setIsTablet(width >= 768 && width < 1440));
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    return (
        <div className={css.container}>
            <div className={css.paddingContainer}>
                {!hideHeader && <Header />}

                {showBreadcrumbs && <Breadcrumbs items={breadcrumbs} />}

                <main className={css.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default SharedLayout;
