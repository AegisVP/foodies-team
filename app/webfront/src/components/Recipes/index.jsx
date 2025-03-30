import css from './Recipes.module.css';
import MainTitle from 'src/components/MainTitle';
import Subtitle from 'src/components/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory } from 'src/redux/common/selectors';
import spriteBack from 'src/images/icons.svg#back';
import { setSelectedCategory, setSelectedIngredients, setSelectedArea } from 'src/redux/common/slice';
import { clearRecipes, setPage } from 'src/redux/recipes/slice';
import RecipeFilters from '../RecipeFilters';
import RecipeList from '../RecipeList';
import RecipePagination from '../RecipePagination';

const Recipes = ({ onUserAvatarClick, onRecipeDetailsClick }) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(selectSelectedCategory);

    const handleClick = () => {
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedArea(null));
        dispatch(setSelectedIngredients([]));
        dispatch(setPage(1));
        dispatch(clearRecipes());
    };

    return (
        <div className={css.recipesMainContainer}>
            <div className={css.recipesTitleContainer}>
                <button className={css.backContainer} aria-label="Back Home" onClick={handleClick}>
                    <svg className={css.backIconContainer}>
                        <use href={spriteBack} className={css.backIcon} />
                    </svg>
                    <p>Back</p>
                </button>
                <MainTitle title={selectedCategory.name} />
                <Subtitle subtitle={selectedCategory.description} />
            </div>
            <div className={css.recipesListFiltersContainer}>
                <RecipeFilters />
                <div className={css.recipesListContainer}>
                    <RecipeList onUserAvatarClick={onUserAvatarClick} onRecipeDetailsClick={onRecipeDetailsClick} />
                    <RecipePagination />
                </div>
            </div>
        </div>
    );
};

export default Recipes;
