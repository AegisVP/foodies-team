import { createSlice } from '@reduxjs/toolkit';
import { logoutUserOperation, updateUserAvatar, loginUserOperation, refreshUser } from './operations';

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
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(refreshUser.rejected, state => {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                localStorage.removeItem('token');
            })
            .addCase(loginUserOperation.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(logoutUserOperation.fulfilled, state => {
                localStorage.removeItem('token');
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.user.avatar = action.payload.avatar;
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

export const { setUser, setIsLoading } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
