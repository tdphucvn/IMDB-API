import React, { useState, useEffect } from 'react';
import Movies from './Movies';


const DiscoverMovies = ({state}) => {
    const TRENDING = 0;
    const REVENUE = 1;
    const LATEST = 2;

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

    const { URL, option } = searchOption;
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
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
                    console.log(rawData);
                    setMovies(rawData.results);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchMoviesData();
    };

    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOption])

    return (
        <React.Fragment>
            {movies && <Movies movies={movies}/>}
        </React.Fragment>
    )
}

export default DiscoverMovies
