import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ROUTES from 'src/navigation/routes';
import RecipeInfo from '../../components/RecipeInfo';

const RecipePage = ({ setCustomBreadcrumbs }) => {
    const { id } = useParams();

    useEffect(() => {
        if (!id || !setCustomBreadcrumbs) return;

        setCustomBreadcrumbs([
            { label: 'Home', path: ROUTES.HOME },
            { label: 'Recipes', path: ROUTES.RECIPES },
            { label: id, path: ROUTES.RECIPE_PAGE.replace(':id', id) },
        ]);
    }, [id, setCustomBreadcrumbs]);
    return (
        <>
            <RecipeInfo />
        </>
    );
};

export default RecipePage;
