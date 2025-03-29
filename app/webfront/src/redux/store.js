import { configureStore } from '@reduxjs/toolkit';
import { authUserReducer } from './authUser/slice';
import { commonReducer } from './common/slice';
import { recipesReducer } from './recipes/slice';
import { favoritesReducer } from './favorites/slice';
import { followersReducer } from './followers/slice';
import { followeesReducer } from './followees/slice';
import { userReducer } from './user/slice';

export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        common: commonReducer,
        recipes: recipesReducer,
        favorites: favoritesReducer,
        followers: followersReducer,
        followees: followeesReducer,
        user: userReducer,
    },
});
