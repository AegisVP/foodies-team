import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from 'src/api/auth.js';

export const UPDATE_AVATAR = 'authUser/updateAvatar';

export const updateUserAvatar = createAsyncThunk(UPDATE_AVATAR, async (avatar, { rejectWithValue }) => {
    try {
        return await authAPI.updateAvatar(avatar);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
