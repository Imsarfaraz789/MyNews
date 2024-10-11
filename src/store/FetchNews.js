import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

// https://newsapi.org/v2/everything?q=tesla&from=2024-10-01&to=2024-10-05&sortBy=popularity&apiKey=6d151f084bc84a288694b50201fd8bd9


export const fetchNews = createAsyncThunk('fetchNews', async () => {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-10-01&to=2024-10-05&sortBy=popularity&apiKey=510343443720439a8a47dac206eb600f&language=en`);
        if (!response.ok) {
            Alert.alert("Failed to fetch data")
        }
        const data = await response.json();

        return data;
    } catch (error) {

        console.log("failed to load data")
    }
});