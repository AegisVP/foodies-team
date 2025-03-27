import { createSlice } from '@reduxjs/toolkit';
import { updateUserAvatar } from './operations';

const token = localStorage.getItem('token');

const initialState = {
    isAuthenticated: token !== null && token !== undefined,
    token: token || null,
    user: null,
    isLoading: false,
    error: null,
};

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log({ payload: action.payload });
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
        },
        logout: state => {
            localStorage.removeItem('token');
            return initialState;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                console.log('updateUserAvatar', action.payload);
                // state.user.avatar = action.payload;
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.error = null;
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

export const { loginSuccess, logout, setUser, setIsLoading } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
