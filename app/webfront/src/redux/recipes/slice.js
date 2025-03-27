import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, fetchOwnerRecipes, addRecipe, deleteRecipe } from './operations';

// TODO add recipe details if needed

// note, in this reducer we use mutable approach to manage state. Redux under hood uses library Immer.
// pay attention, in the scope of one reducer only one approach could be used (mutable or immutable)
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        page: 1,
        totalPages: 1,
        limit: 8,
        // TODO revise if it needed (if not extra details could be taken from the list by id)
        recipeDetails: null,
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

export const { updateRecipeDetails, clearRecipes, setPage, setLimit } = recipesSlice.actions;
