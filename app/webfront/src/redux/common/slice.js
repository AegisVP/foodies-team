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
        isMobile: false,
        isTablet: false,
        // TODO revise do we need it here (for data from public endpoints)
        recipes: [],
        recipeDetails: null,
        favorites: [],
        //
        isLoading: false,
        error: null,
        screenWidth: 375,
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
        setScreenWidth: (state, action) => {
            state.screenWidth = action.payload;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsTablet: (state, action) => {
            state.isTablet = action.payload;
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

export const {
    setIsMobile,
    setIsTablet,
    setSelectedCategory,
    setSelectedIngredients,
    setSelectedArea,
    setScreenWidth,
} = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
