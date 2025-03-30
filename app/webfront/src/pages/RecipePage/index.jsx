import RecipeInfo from '../../components/RecipeInfo';
import PopularRecipes from './PopularRecipes';
import css from './Recipe.module.css';

// Використовуємо renderAfter для вкладання PopularRecipes у правий стовпчик
const RecipePage = ({ setCustomBreadcrumbs }) => {
    return (
        <div className={css.wrapper}>
            <RecipeInfo 
                setCustomBreadcrumbs={setCustomBreadcrumbs} 
                renderAfter={() => <PopularRecipes />}
            />
        </div>
    );
};

export default RecipePage;
