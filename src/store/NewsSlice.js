import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './FetchNews';

const NewsSlice = createSlice({
    name: 'news',
    initialState: {
        data: {
            articles: [],
        },
        isLoader: false,
        isError: false,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending, state => {
                state.isLoader = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.isLoader = false;
                state.data = action.payload;
            })
            .addCase(fetchNews.rejected, state => {
                state.isLoader = false;
                state.isError = true;
            });
    },
});

export default NewsSlice.reducer;
