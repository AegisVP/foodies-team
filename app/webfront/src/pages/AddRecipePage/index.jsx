import { useDispatch, useSelector } from 'react-redux';
import { updateRecipeDetails } from 'src/redux/recipes/slice';
import { selectRecipeDetails } from 'src/redux/recipes/selectors';

const AddRecipePage = () => {
    const dispatch = useDispatch();
    const recipeDetails = useSelector(selectRecipeDetails);

    const onSubmit = (e) => {
        e.preventDefault();
        const { title, description } = e.target.form.elements;
        dispatch(updateRecipeDetails({ title: title.value, description: description.value }));
    };

    return (
        <div>
            <h1>Add Recipe</h1>
            <form>
                <input type="text" name="title" placeholder="Recipe name" />
                <input type="text" name="description" placeholder="Description" />
                <button type="submit" onClick={onSubmit}>
                    Add recipe
                </button>
                {recipeDetails &&
                    Object.entries(recipeDetails).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
            </form>
        </div>
    );
};

export default AddRecipePage;
