import { createSlice } from '@reduxjs/toolkit';

const genreSlice = createSlice({
    name: 'genres',
    initialState: [],
    reducers: {
        getGenres: (state) => {},
        setGenres: (state, action) => {
            const genresData = action.payload;
            return {...state, ...genresData}
        },  
    },
});

export const { getGenres, setGenres } = genreSlice.actions;

export default genreSlice.reducer;