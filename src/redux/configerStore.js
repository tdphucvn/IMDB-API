import { configureStore, combineReducers } from '@reduxjs/toolkit';
import genreSlice from './GenresSlice';


const store = configureStore({
    reducer: genreSlice,
});

export default store;