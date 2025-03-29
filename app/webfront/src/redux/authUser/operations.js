import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAvatar, logoutUser, loginUser, getCurrentUser } from 'src/api/auth.js';

export const UPDATE_AVATAR = 'authUser/updateAvatar';

export const updateUserAvatar = createAsyncThunk(UPDATE_AVATAR, async (avatar, { rejectWithValue }) => {
    try {
        return await updateAvatar(avatar);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logoutUserOperation = createAsyncThunk('authUser/logoutUser', async (_, { rejectWithValue }) => {
    try {
        return await logoutUser();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const loginUserOperation = createAsyncThunk('authUser/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const res = await loginUser(credentials);
        console.log({ res });
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk('authUser/refreshUser', async (_, { rejectWithValue }) => {
    try {
        return await getCurrentUser();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
