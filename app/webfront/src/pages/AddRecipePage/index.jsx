import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import ROUTES from 'src/navigation/routes';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';
import { useShowError } from 'src/hooks/useShowError.js';
import { convertObjectToFormData } from 'src/utils/convertObjectToFormData';

import {
    selectCommonError,
    selectIsCommonLoading,
    selectCategories,
    selectIngredients,
    selectAreas,
} from 'src/redux/common/selectors';
import { getCategories, getAreas, getIngredients } from 'src/redux/common/operations';
import { addRecipe } from 'src/redux/recipes/operations';
import {
    setRecipeCategory,
    setRecipeArea,
    setCurrentIngredient,
    updateRecipeDetails,
    resetRecipeDetails,
    addRecipeIngredient,
    deleteRecipeIngredient,
} from 'src/redux/recipes/slice';
import {
    selectRecipeDetails,
    selectRecipeThumb,
    selectRecipeCategory,
    selectRecipeArea,
    selectCurrentIngredient,
    selectRecipeIngredients,
    selectIsRecipesLoading,
    selectRecipesError,
    selectIsRecipesSuccessful,
} from 'src/redux/recipes/selectors';
import { selectAuthUserId } from 'src/redux/authUser/selectors';

import {
    Button,
    FileInput,
    Input,
    TitleInput,
    Dropdown,
    Column,
    CookingTime,
    IngredientCard,
    Loader,
} from 'src/components';

import trashGrey from 'src/images/trashGrey.svg';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //authUser
    const userId = useSelector(selectAuthUserId);

    // recipe details
    const recipeDetails = useSelector(selectRecipeDetails);
    const recipeThumb = useSelector(selectRecipeThumb);
    const isSuccessful = useSelector(selectIsRecipesSuccessful);
    const isLoading = useSelector(selectIsRecipesLoading);
    const recipeCreationError = useSelector(selectRecipesError);

    // common
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);
    const areas = useSelector(selectAreas);
    const ingredients = useSelector(selectIngredients);
    const recipeCategory = useSelector(selectRecipeCategory);
    const recipeArea = useSelector(selectRecipeArea);
    const currentIngredient = useSelector(selectCurrentIngredient);
    const recipeIngredients = useSelector(selectRecipeIngredients);

    // non-serialized values are not allowed to be stored in redux
    const [file, setFile] = useState(null);

    const formMethods = useForm({
        defaultValues: recipeDetails,
    });
    const {
        handleSubmit,
        reset,
        watch,
        setError,
        setValue,
        formState: { isSubmitted },
    } = formMethods;
    const quantity = watch('quantity');

    const onImageChange = async file => {
        setFile(file);
        const thumb = URL.createObjectURL(file);
        dispatch(updateRecipeDetails({ thumb }));
    };

    const onIngredientAdd = () => {
        if (!currentIngredient) return;
        if (!quantity) {
            setError('quantity', {
                type: 'required',
                message: 'Enter quantity',
            });
            return;
        }
        const currentIngredientId = currentIngredient.value;
        const ingredient = ingredients.find(ing => ing.id === currentIngredientId);
        dispatch(addRecipeIngredient({ ...ingredient, measure: quantity }));
        dispatch(setCurrentIngredient(null));
        setValue('quantity', '');
    };

    const onIngredientDelete = id => {
        dispatch(deleteRecipeIngredient(id));
    };

    const onReset = () => {
        reset();
        setFile(null);
        dispatch(resetRecipeDetails());
    };

    const onSubmit = async data => {
        if (!recipeIngredients?.length) {
            return;
        }
        const transformedIngredients = recipeIngredients.map(({ id, measure }) => ({ id, measure }));

        const recipe = {
            title: data.title,
            category: recipeCategory.value,
            area: recipeArea.value,
            instructions: data.instructions,
            description: data.description,
            thumb: file,
            time: data.time.toString(),
            ingredients: transformedIngredients,
        };

        const formData = convertObjectToFormData(recipe);

        dispatch(addRecipe(formData));
    };

    useEffect(() => {
        if (!isCommonLoading) {
            if (!categories?.length) dispatch(getCategories());

            if (!areas?.length) dispatch(getAreas());

            if (!ingredients?.length) dispatch(getIngredients());
        }
    }, [dispatch, isCommonLoading]);

    useEffect(() => {
        if (isSuccessful) {
            navigate(replaceUrlParams(ROUTES.USER_PAGE, { id: userId }));
        }
    }, [isSuccessful]);

    // clear data on page unmount
    useEffect(() => {
        return () => {
            onReset();
        };
    }, []);

    useShowError(error || recipeCreationError);
    return (
        <div>
            {isLoading && <Loader />}
            <h2 className={css['pageTitle']}>Add recipe</h2>
            <p className={css.subtitle}>
                Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
            </p>
            <div className={css.container}>
                <FormProvider {...formMethods}>
                    <FileInput name="thumb" file={recipeThumb} onImageChange={onImageChange} />
                    <div className={css['detailsContainer']}>
                        <TitleInput name="title" placeholder="The name of the recipe" />
                        <Input name="description" placeholder="Enter a description of the dish" withCounter />
                        <Column title="Cooking time">
                            <CookingTime />
                        </Column>
                        <div className={css['responsibleContainer']}>
                            <Column title="Category">
                                <Dropdown
                                    items={categories}
                                    label="Select a category"
                                    selectedValue={recipeCategory}
                                    callback={setRecipeCategory}
                                    isForSearch={false}
                                    isControlled
                                    name="category"
                                />
                            </Column>
                            <Column title="Area">
                                <Dropdown
                                    items={areas}
                                    label="Select an area"
                                    selectedValue={recipeArea}
                                    callback={setRecipeArea}
                                    isForSearch={false}
                                    isControlled
                                    name="area"
                                />
                            </Column>
                        </div>
                        <div className={css['responsibleContainer']}>
                            <Column title="Ingredients">
                                <Dropdown
                                    items={ingredients}
                                    label="Add an ingredient"
                                    selectedValue={currentIngredient}
                                    callback={setCurrentIngredient}
                                    isForSearch={false}
                                />
                            </Column>
                            <Input name="quantity" placeholder="Enter quantity" isRequired={false} />
                        </div>
                        <Button onClick={onIngredientAdd} label="Add Ingredient" className={css.fitContent} />
                        {!recipeIngredients.length && isSubmitted && (
                            <p className={css.error}>{'Add at least one ingredient'}</p>
                        )}
                        {!!recipeIngredients.length && (
                            <div className={css.row}>
                                {recipeIngredients.map(({ id, name, image, measure }) => (
                                    <IngredientCard
                                        key={id}
                                        imageUrl={image}
                                        title={name}
                                        subtitle={measure}
                                        onDelete={() => onIngredientDelete(id)}
                                    />
                                ))}
                            </div>
                        )}

                        <Column title="Recipe preparation">
                            <Input name="instructions" placeholder="Enter Recipe" multiline withCounter />
                        </Column>

                        <div className={css.row}>
                            <button className={css.roundedBtn} onClick={onReset}>
                                <img src={trashGrey} alt="details" />
                            </button>
                            <Button
                                disabled={isLoading}
                                onClick={handleSubmit(onSubmit)}
                                label="Publish"
                                theme="dark"
                                className={css.fitContent}
                            />
                        </div>
                    </div>
                </FormProvider>
            </div>
        </div>
    );
};

export default AddRecipePage;
