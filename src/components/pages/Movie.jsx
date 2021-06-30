import { DialogTitle } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import SingleHeader from '../utils/header/SingleHeader';
import MovieOverview from '../utils/movie/MovieOverview';

const Movie = () => {
    const [movie, setMovie] = useState([]);
    const {id} = useParams();
    
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;

    useEffect(() => {
        const fetchMovie = async () => {
            await fetch(URL, {method: 'GET', contentType: 'application/json'})
                .then((res) => {
                    if (res.ok) return res.text();
                    return res.text().then(err => {
                        return Promise.reject({
                            status: res.status,
                            statusText: res.statusText,
                            errorMessage: err,
                        });
                    });
                })
                .then((data) => {
                    setMovie(JSON.parse(data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchMovie();
    }, [URL]);

    return (
        <>
            <SingleHeader />
            <MovieOverview movieData={movie}/>
        </>
    )
}

export default Movie
