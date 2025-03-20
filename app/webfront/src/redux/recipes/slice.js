import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, addRecipe, deleteRecipe } from './operations';

// TODO add recipe details if needed

// note, in this reducer we use mutable approach to manage state. Redux under hood uses library Immer.
// pay attention, in the scope of one reducer only one approach could be used (mutable or immutable)
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        // TODO revise if it needed (if not extra details could be taken from the list by id)
        recipeDetails: null,
        isLoading: false,
        error: null,
    },
    // example of synchronous actions creation
    // TODO delete if not needed
    reducers: {
        updateRecipeDetails(state, action) {
            state.recipeDetails = {
                ...state.recipeDetails,
                ...action.payload,
            };
        },
    },
    // example of asynchronous actions creation
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.recipes.push(action.payload);
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                const index = state.findIndex((recipe) => recipe.id === action.payload);
                state.recipes.splice(index, 1);
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                }
            );
    },
});

export const recipesReducer = recipesSlice.reducer;

export const { updateRecipeDetails } = recipesSlice.actions;
