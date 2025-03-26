import RecipeCard from '../RecipeCard';
import css from './RecipeList.module.css';

import { useSelector } from 'react-redux';
import { useShowError } from 'src/hooks/useShowError.js';
import { selectRecipes, selectIsRecipesLoading, selectRecipesError } from 'src/redux/recipes/selectors';

const RecipeList = () => {
    const isRecipesLoading = useSelector(selectIsRecipesLoading);
    const error = useSelector(selectRecipesError);
    const recipes = useSelector(selectRecipes);

    useShowError(error);

    return (
        <>
            {!isRecipesLoading && !!recipes?.length && (
                <ul className={css.recipeListContainer}>
                    {recipes.map(item => (
                        <li key={item.id}>
                            <RecipeCard
                                mealImage={item.thumb}
                                title={item.title}
                                description={item.description}
                                userAvatar={item.owner.avatar}
                                userName={item.owner.name}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default RecipeList;
