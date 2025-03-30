import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'src/api/profile';

export const getFollowers = createAsyncThunk('followers/getFollowers', async ({ id, page }, { rejectWithValue }) => {
    try {
        const followers = await api.getFollowers({ id, page });
        return followers;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
