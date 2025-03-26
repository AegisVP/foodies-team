import { stylesPC, stylesTablet, stylesMobile } from './styles';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRecipes } from 'src/redux/recipes/operations';
import {
    selectSelectedArea,
    selectSelectedIngredients,
    selectSelectedCategory,
    selectScreenWidth,
} from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';
import { setScreenWidth } from 'src/redux/common/slice';

const Dropdown = ({ items, label, callback, selectedValue, isMulti = false, isForSearch = true }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedCategory = useSelector(selectSelectedCategory);
    const selectedIngredients = useSelector(selectSelectedIngredients);
    const screenWidth = useSelector(selectScreenWidth);

    const dispatch = useDispatch();

    const handleResize = () => {
        const width = window.innerWidth;
        dispatch(setScreenWidth(width));
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const options = items.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const handleChange = selected => {
        dispatch(callback(selected));
        dispatch(setPage(1));
        if (isMulti) {
            if (isForSearch) {
                dispatch(
                    fetchRecipes({
                        page: 1,
                        category: selectedCategory?.id,
                        area: selectedArea?.value,
                        ingredients: selected.map(sel => sel.value),
                    })
                );
            }
        } else {
            if (isForSearch) {
                dispatch(
                    fetchRecipes({
                        page: 1,
                        category: selectedCategory?.id,
                        area: selected?.value,
                        ingredients: selectedIngredients.map(ing => ing.value),
                    })
                );
            }
        }
    };

    return (
        <Select
            isMulti={isMulti}
            onChange={handleChange}
            value={selectedValue}
            options={options}
            placeholder={label}
            isSearchable={true}
            styles={
                screenWidth < 768
                    ? stylesMobile()
                    : screenWidth < 1440
                    ? stylesTablet({ isForSearch: true, screenWidth: screenWidth })
                    : stylesPC({ isForSearch: true })
            }
        />
    );
};

export default Dropdown;
