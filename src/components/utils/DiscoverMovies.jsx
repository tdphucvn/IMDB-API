import React, { useState, useEffect } from 'react';
import Movies from './Movies';

const TRENDING = 0;
const REVENUE = 1;
const LATEST = 2;
const SEARCH = 3;

const setSearchOption = (state) => {
    let searchOption;
    switch (state) {
        case TRENDING:
            searchOption = {
                URL: 'https://api.themoviedb.org/3/trending/all/week?api_key=ef7ddaa9270377970a055a19e5bfc2e5',
                option: {
                    method: 'GET', 
                    contentType: 'application/json'
                }
            };
            break;
        case REVENUE:
            searchOption = {
                URL: 'https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=5&sort_by=revenue.desc',
                option: {
                    method: 'GET', 
                    contentType: 'application/json'
                }
            };
            break;
        case LATEST:
            searchOption = {
                URL: 'https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=6&sort_by=release_date.desc',
                option: {
                    method: 'GET', 
                    contentType: 'application/json'
                }
            };
            break;
        default: 
    };
    return searchOption;    
}


const DiscoverMovies = ({state, searchQuery}) => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async (searchOptions) => {
        const {URL, option} = searchOptions;
        const fetchMoviesData = async () => {
            await fetch(URL, option)
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
                .then(data => {
                    const rawData = JSON.parse(data);
                    setMovies(rawData.results);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchMoviesData();
    };

    useEffect(() => {
        if(searchQuery && searchQuery.length > 0){
            console.log('Not empty search', searchQuery)
            const queryGenresRaw = searchQuery[2] !== undefined && searchQuery[2].length !== 0 ? searchQuery[2].map((genre) => {return genre.id + '%2C'}) : '';
            const queryGenres = queryGenresRaw.toString().replace(',', '');
            const queryString = (searchQuery[1] !== undefined && searchQuery[1].length !== '' ? searchQuery[1] + '&' : '') + (searchQuery[0] !== undefined && searchQuery[0].length !== '' ? 'year=' + searchQuery[0] + '&' : '') + 'with_genres=' + queryGenres;
            const URL = `https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=5&${queryString}`;
            const option = { method: 'GET', contentType: 'application/json' };
            fetchMovies({URL, option});
            return;
        };
        console.log('Empty search');
        const searchOption = setSearchOption(state);
        fetchMovies(searchOption);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, searchQuery])

    return (
        <React.Fragment>
            {movies && <Movies movies={movies}/>}
        </React.Fragment>
    )
}

export default DiscoverMovies
