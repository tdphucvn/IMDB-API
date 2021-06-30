import { DialogTitle } from '@material-ui/core';
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import SingleHeader from '../utils/header/SingleHeader';

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
                    setTimeout(() => setMovie(JSON.parse(data)), 700);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchMovie();
    }, [URL]);

    console.log(movie)

    const {backdrop_path: backdrop, poster_path: poster, budget, genres, homepage, id: movieID, overview, vote_average: vote, release_date: release, title } = movie;
    const IMG_API_BACKDROP = 'https://image.tmdb.org/t/p/original/';
    const IMG_API_POSTER = 'https://image.tmdb.org/t/p/w500/';

    return (
        <>
            <SingleHeader />
            {movie === undefined ? '' :
                <>
                    <h3>{title}</h3>
                    <img src={IMG_API_BACKDROP + backdrop} alt="poster" />
                    <img src={IMG_API_POSTER + poster} alt="" />
                    <img src="" alt="" />
                    <div>Release Date: {release}</div>
                    <div>Genre: {genres && genres.map((genre) => (<div key={genre.id}>{genre.name}</div>))}</div>
                    <div>Budget: {budget}</div>
                    <div>{overview}</div>
                    <div>Actors: {homepage}</div>
                    <div>Rating {vote}</div>
                </>
            }
        </>
    )
}

export default Movie
