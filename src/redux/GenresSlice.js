import { createSlice } from '@reduxjs/toolkit';

let genres;

const fetchGenre = async () => {
    const URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US";
    const defaultFetchGenre = async () => {
        await fetch(URL, {method: 'GET', contentType: 'application/json'})
            .then((res) => {
                if(res.ok) return res.text();
                return res.text().then(err => {
                return Promise.reject({
                    status: res.status,
                    statusText: res.statusText,
                    errorMessage: err,
                });
                });
            })
            .then((data) => {
                const rawData = JSON.parse(data);
                const dataEdit = rawData.genres.map((genre) => {
                    genre.state = false;
                    return genre;
                });
                genres = dataEdit;
            })
            .catch((err) => {
            console.log(err);
            });
    };
    defaultFetchGenre();
};
fetchGenre()

const genreSlice = createSlice({
    name: 'genres',
    initialState: genres,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => ({ ...state, count: state.count - 1 }),  
    },
});

export const { increment, decrement } = genreSlice.actions;

export default genreSlice.reducer;