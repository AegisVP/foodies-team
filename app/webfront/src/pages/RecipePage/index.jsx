import RecipeInfo from '../../components/RecipeInfo';
import PopularRecipes from './PopularRecipes';
import css from './Recipe.module.css';

const RecipePage = ({ setCustomBreadcrumbs }) => {
    return (
        <div className={css.wrapper}>
            <RecipeInfo 
                setCustomBreadcrumbs={setCustomBreadcrumbs} 
            />
            <PopularRecipes />
        </div>
    );
};

export default RecipePage;
