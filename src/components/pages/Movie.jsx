import { DialogTitle } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import SingleHeader from '../utils/header/SingleHeader';
import MovieOverview from '../utils/movie/MovieOverview';

const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);
    const [movieCredit, setMovieCredit] = useState([]);
    const {id} = useParams();
    
    const URL_DATA = `https://api.themoviedb.org/3/movie/${id}?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
    const URL_VIDEOS = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
    const URL_CREDIT = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;

    const fetchData = async (URL, setter) => {
        const method = {
            method: 'GET', 
            contentType: 'application/json',
        };
        await fetch(URL, method)
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
            setter(JSON.parse(data));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchData(URL_DATA, setMovie);
        fetchData(URL_VIDEOS, setMovieTrailer);
        fetchData(URL_CREDIT, setMovieCredit);
        // const fetchMovie = async () => {
        //     await fetch(URL, {method: 'GET', contentType: 'application/json'})
        //         .then((res) => {
        //             if (res.ok) return res.text();
        //             return res.text().then(err => {
        //                 return Promise.reject({
        //                     status: res.status,
        //                     statusText: res.statusText,
        //                     errorMessage: err,
        //                 });
        //             });
        //         })
        //         .then((data) => {
        //             setMovie(JSON.parse(data));
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // };

        // const fetchMoviesVideos = async () => {
        //     const method = {method: 'GET', contentType: 'application/json'};
        //     await fetch(URL_VIDEOS, method)
        //     .then((res) => {
        //         if (res.ok) return res.text();
        //         return res.text().then(err => {
        //             return Promise.reject({
        //                 status: res.status,
        //                 statusText: res.statusText,
        //                 errorMessage: err,
        //             });
        //         });
        //     })
        //     .then((data) => {
        //         setMovieTrailer(JSON.parse(data));
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // };
        // fetchMovie();
        // fetchMoviesVideos();
    }, [id, URL_CREDIT, URL_DATA, URL_VIDEOS]);

    console.log(movie, movieTrailer, movieCredit)

    return (
        <>
            <SingleHeader />
            <MovieOverview movieData={movie} trailer={movieTrailer.results}/>
        </>
    )
}

export default Movie
