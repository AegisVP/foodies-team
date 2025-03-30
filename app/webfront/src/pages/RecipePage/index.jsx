import { useNavigate } from 'react-router-dom';
import RecipeInfo from '../../components/RecipeInfo';
import PopularRecipes from './PopularRecipes';
import ROUTES from 'src/navigation/routes';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';
import css from './Recipe.module.css';

const RecipePage = ({ setCustomBreadcrumbs }) => {
    const navigate = useNavigate();
    
    const handleUserAvatarClick = (userId) => {
        if (userId) {
            navigate(replaceUrlParams(ROUTES.USER_PROFILE, { id: userId }));
        }
    };
    
    return (
        <div className={css.wrapper}>
            <RecipeInfo 
                setCustomBreadcrumbs={setCustomBreadcrumbs} 
            />
            <PopularRecipes onUserAvatarClick={handleUserAvatarClick} />
        </div>
    );
};

export default RecipePage;
