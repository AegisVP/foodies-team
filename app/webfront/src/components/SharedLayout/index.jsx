import Header from '../Header';
import Footer from '../Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile, setIsTablet } from '../../redux/common/slice';
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            const width = document.querySelector('body').getBoundingClientRect().width;
            dispatch(setIsMobile(width < 768));
            dispatch(setIsTablet(width >= 768 && width < 1440));
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    return (
        <div className={css.container}>
            <div className={css.paddingContainer}>
                <Header />
                <main className={css.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default SharedLayout;
