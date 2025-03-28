import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, fetchOwnerRecipes, addRecipe, deleteRecipe } from './operations';

const recipeDetailsInitialState = {
    thumb: null,
    title: '',
    description: '',
    category: '',
    area: '',
    time: 0,
    instructions: '',
    ingredients: [],
    currentIngredient: '',
    quantity: '',
};

// note, in this reducer we use mutable approach to manage state. Redux under hood uses library Immer.
// pay attention, in the scope of one reducer only one approach could be used (mutable or immutable)
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        page: 1,
        totalPages: 1,
        limit: 8,
        recipeDetails: recipeDetailsInitialState,
        isLoading: false,
        error: null,
    },
    // example of synchronous actions creation
    // TODO delete if not needed
    reducers: {
        clearRecipes(state) {
            state.recipes = [];
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setLimit(state, action) {
            state.limit = action.payload;
        },
        updateRecipeDetails(state, action) {
            state.recipeDetails = {
                ...state.recipeDetails,
                ...action.payload,
            };
        },
        resetRecipeDetails(state) {
            state.recipeDetails = recipeDetailsInitialState;
        },
        setRecipeCategory: (state, action) => {
            state.recipeDetails.category = action.payload;
        },
        setRecipeArea: (state, action) => {
            state.recipeDetails.area = action.payload;
        },
        setCurrentIngredient: (state, action) => {
            state.recipeDetails.currentIngredient = action.payload;
        },
        addRecipeIngredient: (state, action) => {
            state.recipeDetails.ingredients.push(action.payload);
        },
        deleteRecipeIngredient: (state, action) => {
            const index = state.recipeDetails.ingredients.findIndex(ingredient => ingredient.id === action.payload);
            state.recipeDetails.ingredients.splice(index, 1);
        },
    },
    // example of asynchronous actions creation
    extraReducers: builder => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload.recipes;
                state.page = action.payload.page;
                state.totalPages = action.payload.pages;
            })
            .addCase(fetchOwnerRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload.recipes;
                state.page = action.payload.page;
                state.totalPages = action.payload.pages;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.recipes.push(action.payload);
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                const index = state.recipes.findIndex(recipe => recipe.id === action.payload);
                state.recipes.splice(index, 1);
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/fulfilled'),
                state => {
                    state.isLoading = false;
                }
            );
    },
});

export const recipesReducer = recipesSlice.reducer;

export const {
    updateRecipeDetails,
    resetRecipeDetails,
    clearRecipes,
    setPage,
    setLimit,
    setRecipeCategory,
    setRecipeArea,
    setCurrentIngredient,
    addRecipeIngredient,
    deleteRecipeIngredient,
} = recipesSlice.actions;
