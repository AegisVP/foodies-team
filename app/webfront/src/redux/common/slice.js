import { createSlice } from '@reduxjs/toolkit';
import { getAreas, getCategories, getIngredients, getTestimonials } from './operations';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        selectedCategory: null,
        selectedIngredients: [],
        selectedArea: null,
        categories: [],
        areas: [],
        ingredients: [],
        testimonials: [],
        // TODO revise do we need it here (for data from public endpoints)
        recipes: [],
        recipeDetails: null,
        favorites: [],
        //
        isLoading: false,
        error: null,
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedIngredients: (state, action) => {
            state.selectedIngredients = action.payload;
        },
        setSelectedArea: (state, action) => {
            state.selectedArea = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })
            .addCase(getAreas.fulfilled, (state, action) => {
                state.areas = action.payload;
            })
            .addCase(getTestimonials.fulfilled, (state, action) => {
                state.testimonials = action.payload;
            })
            // TODO add other cases here
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

export const { setSelectedCategory, setSelectedIngredients, setSelectedArea } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
