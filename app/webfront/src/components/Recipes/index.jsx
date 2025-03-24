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

const Recipes = () => {
    const selectedCategory = useSelector(selectSelectedCategory);

    const dispatch = useDispatch();

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
                <Subtitle subtitle="Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires." />
            </div>
            <RecipeFilters />
            <RecipeList />
            <RecipePagination />
        </div>
    );
};

export default Recipes;
