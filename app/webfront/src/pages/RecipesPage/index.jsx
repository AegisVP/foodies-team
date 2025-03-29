import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes, selectIsRecipesLoading, selectRecipesError } from 'src/redux/recipes/selectors';
import { fetchOwnerRecipes } from 'src/redux/recipes/operations';
import { useShowError } from 'src/hooks/useShowError.js';
import css from './RecipesPage.module.css';
import OwnerRecipeCard from 'src/components/OwnerRecipeCard';
import RecipePagination from 'src/components/RecipePagination';
import { Loader } from 'src/components';
import Empty from 'src/components/Empty';

const RecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(selectRecipes);
    const isLoading = useSelector(selectIsRecipesLoading);
    const error = useSelector(selectRecipesError);

    useShowError(error);

    useEffect(() => {
        dispatch(fetchOwnerRecipes({ page: 1 }));
    }, [dispatch]);

    return (
        <div className={css.container}>
            {isLoading && <Loader />}

            {!isLoading && recipes?.length === 0 && <Empty message="You haven't added any recipes yet" />}

            {!isLoading && recipes?.length > 0 && (
                <>
                    <ul className={css.recipeList}>
                        {recipes.map(recipe => (
                            <li key={recipe.id} className={css.recipeItem}>
                                <OwnerRecipeCard recipe={recipe} />
                            </li>
                        ))}
                    </ul>
                    <RecipePagination variant="owner" />
                </>
            )}
        </div>
    );
};

export default RecipesPage;
