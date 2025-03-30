import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'src/api/profile';

export const getFollowees = createAsyncThunk('followees/getFollowees', async (page, { rejectWithValue }) => {
    try {
        const followees = await api.getFollowees(page);
        return followees;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
