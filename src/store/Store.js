import { configureStore } from '@reduxjs/toolkit';
import NewsSlice from './NewsSlice';


const Store = configureStore({
    reducer: {
        News: NewsSlice,
    },
});

export default Store;