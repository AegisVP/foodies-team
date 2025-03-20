import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const commonSlice = createSlice({
    name: 'recipes',
    initialState: {
        categories: [],
        areas: [],
        ingredients: [],
        testimonials: [],
        // TODO revise do we need it here
        recipes: [],
        recipeDetails: null,
        favorites: [],
        //
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            // TODO add other cases here
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

export const commonReducer = commonSlice.reducer;
