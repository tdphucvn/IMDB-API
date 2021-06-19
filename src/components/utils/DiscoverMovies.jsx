import React, { useState, useEffect } from 'react';
import Movies from './Movies';


const DiscoverMovies = ({state, searchedMovies}) => {
    const TRENDING = 0;
    const REVENUE = 1;
    const LATEST = 2;

    const setSearchoption = (state) => {
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
                return searchOption;
            case REVENUE:
                searchOption = {
                    URL: 'https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=5&sort_by=revenue.desc',
                    option: {
                        method: 'GET', 
                        contentType: 'application/json'
                    }
                };
                return searchOption;
            case LATEST:
                searchOption = {
                    URL: 'https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=6&sort_by=release_date.desc',
                    option: {
                        method: 'GET', 
                        contentType: 'application/json'
                    }
                };
                return searchOption;
            default: 
        };    
    }

    const [searchOptions, setSearchOptions] = useState({URL: '', option: {}});
    const [movies, setMovies] = useState([]);
    const [searchType, setSearchType] = useState(TRENDING);

    console.log(searchType, searchOptions);

    const fetchMovies = async () => {
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
        if (searchedMovies && searchedMovies.length > 1 && searchType !== 3){
            setSearchType(3);
            return;
        };
        setSearchType(state);
        setSearchOptions(setSearchoption(state));
        if(searchedMovies && searchedMovies.length > 1 && searchType < 3) {
            setMovies(searchedMovies);
            return;
        }
        if(URL !== '') fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchType])

    return (
        <React.Fragment>
            {movies && <Movies movies={movies}/>}
        </React.Fragment>
    )
}

export default DiscoverMovies
