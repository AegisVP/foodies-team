import css from './RecipeFilters.module.css';
import Dropdown from 'src/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useShowError } from 'src/hooks/useShowError.js';
import {
    selectCommonError,
    selectIsCommonLoading,
    selectIngredients,
    selectAreas,
    selectSelectedIngredients,
    selectSelectedArea,
} from 'src/redux/common/selectors';
import { getIngredients, getAreas } from 'src/redux/common/operations';
import { setSelectedIngredients, setSelectedArea } from 'src/redux/common/slice';

const RecipeFilters = () => {
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const ingredients = useSelector(selectIngredients);
    const areas = useSelector(selectAreas);
    const selectedArea = useSelector(selectSelectedArea);
    const selectedIngredients = useSelector(selectSelectedIngredients);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isCommonLoading) {
            if (!ingredients?.length) {
                dispatch(getIngredients());
            }
            if (!areas?.length) {
                dispatch(getAreas());
            }
        }
    }, [dispatch, ingredients, areas, isCommonLoading]);

    useShowError(error);

    return (
        <div className={css.filtersContainer}>
            {!isCommonLoading && !!ingredients?.length && (
                <Dropdown
                    items={ingredients}
                    label="Ingredients"
                    selectedValue={selectedIngredients}
                    callback={setSelectedIngredients}
                    isMulti={true}
                />
            )}
            {!isCommonLoading && !!areas?.length && (
                <Dropdown items={areas} label="Area" selectedValue={selectedArea} callback={setSelectedArea} />
            )}
        </div>
    );
};

export default RecipeFilters;
