import css from './CategoryCard.module.css';
import spriteArrow from 'src/images/icons.svg#arrow';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from 'src/redux/common/slice';
import { fetchRecipes } from 'src/redux/recipes/operations';
import { selectSelectedArea, selectSelectedIngredients } from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';

const CategoryCard = ({ item }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedIngredients = useSelector(selectSelectedIngredients);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedCategory(item));
        dispatch(setPage(1));
        dispatch(
            fetchRecipes({
                page: 1,
                category: item.id,
                area: selectedArea?.value,
                ingredients: selectedIngredients.map(ing => ing.value),
            })
        );
    };

    return (
        <div className={css.imageContainer} aria-label={item.name}>
            <img src={`src/images/${item.name}.png`} alt={item.name} className={css.image} />
            <div className={css.buttonsContainer}>
                <p className={css.label}>{item.name}</p>
                <button aria-label={item.name} className={css.forwardButton} onClick={handleClick}>
                    <svg>
                        <use href={spriteArrow} className={css.arrow}></use>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;
