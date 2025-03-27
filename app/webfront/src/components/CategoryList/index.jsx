import CategoryCard from '../CategoryCard';
import css from './CategoryList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from 'src/redux/common/slice';
import { fetchRecipes } from 'src/redux/recipes/operations';
import { selectSelectedArea, selectSelectedIngredients } from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';

const CategoryList = ({ items }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedIngredients = useSelector(selectSelectedIngredients);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedCategory({ id: 'all', name: 'All Categories' }));
        dispatch(setPage(1));
        dispatch(
            fetchRecipes({
                page: 1,
                category: 'all',
                area: selectedArea?.value,
                ingredients: selectedIngredients.map(ing => ing.value),
            })
        );
    };

    return (
        <ul className={css.gallery}>
            {items.map(item => (
                <li key={item.id}>
                    <CategoryCard item={item} />
                </li>
            ))}
            <li key="all-categories-id">
                <div className={css.allCategoriesContainer}>
                    <button aria-label="All Categories" className={css.allCategoriesLink} onClick={handleClick}>
                        All Categories
                    </button>
                </div>
            </li>
        </ul>
    );
};

export default CategoryList;
