import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { get, useFormContext, Controller } from 'react-hook-form';
import { fetchRecipes } from 'src/redux/recipes/operations';
import {
    selectSelectedArea,
    selectSelectedIngredients,
    selectSelectedCategory,
    selectScreenWidth,
} from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';
import { setScreenWidth } from 'src/redux/common/slice';

import { stylesPC, stylesTablet, stylesMobile, wrapper, error as errorStyles } from './styles';

const Dropdown = ({
    items,
    label,
    callback,
    selectedValue,
    isMulti = false,
    isForSearch = true,
    isControlled = false,
    isRequired = true,
    name = '',
}) => {
    const {
        formState: { errors },
        control,
    } = useFormContext() || { formState: {} };
    const error = get(errors, name, false);

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

    return isControlled ? (
        <div style={wrapper}>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: isRequired && label,
                }}
                render={({ field }) => (
                    <Select
                        isMulti={isMulti}
                        onChange={e => {
                            field.onChange(e);
                            handleChange(e);
                        }}
                        value={field.value}
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
                )}
            />
            {error?.message && <p style={errorStyles}>{error.message}</p>}
        </div>
    ) : (
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
