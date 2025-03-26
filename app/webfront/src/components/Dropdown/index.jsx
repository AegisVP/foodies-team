import { styles } from './styles';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from 'src/redux/recipes/operations';
import { selectSelectedArea, selectSelectedIngredients, selectSelectedCategory } from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';

const Dropdown = ({ items, label, callback, selectedValue, isMulti = false, isForSearch = true }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedCategory = useSelector(selectSelectedCategory);
    const selectedIngredients = useSelector(selectSelectedIngredients);

    const dispatch = useDispatch();

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
            styles={styles(isForSearch)}
        />
    );
};

export default Dropdown;
