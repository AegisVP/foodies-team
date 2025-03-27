import css from './Categories.module.css';
import MainTitle from '../MainTitle';
import Subtitle from '../Subtitle';
import CategoryList from '../CategoryList';
import { setLimit } from 'src/redux/recipes/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Categories = ({ items }) => {
    const dispatch = useDispatch();

    const handleResize = () => {
        const width = window.innerWidth;

        if (width < 768) {
            dispatch(setLimit(8));
        } else {
            dispatch(setLimit(12));
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={css.categoriesMainContainer}>
            <div className={css.categoriesTitleContainer}>
                <MainTitle title="Categories" />
                <Subtitle subtitle="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen." />
            </div>
            <CategoryList items={items} />
        </div>
    );
};

export default Categories;
