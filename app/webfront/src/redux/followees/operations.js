import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'src/api/profile';

export const getFollowees = createAsyncThunk('followees/getFollowees', async (_, { rejectWithValue }) => {
    try {
        const followees = await api.getFollowees();
        return followees;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
