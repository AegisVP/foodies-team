import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'src/api/profile';

export const getFollowers = createAsyncThunk('followers/getFollowers', async (id, { rejectWithValue }) => {
    try {
        const followers = await api.getFollowers(id);
        return followers;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
