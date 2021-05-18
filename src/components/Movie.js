import {React, useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';

const Movie = () => {
    const [movie, setMovie] = useState();
    const {id} = useParams();
    
    const URL = `http://www.omdbapi.com/?apikey=2b921791&i=${id}`;

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

    console.log(movie);

    return (
        <>
            {movie === undefined ? '' :
                <>
                    <h3>{movie.Title}</h3>
                    <img src={movie.Poster} alt="poster" />
                    <div>Release Date: {movie.Released}</div>
                    <div>Genre: {movie.Genre}</div>
                    <div>Type: {movie.Type}</div>
                    <div>{movie.Plot}</div>
                    <div>Actors: {movie.Actors}</div>
                    <div>Rating {movie.imdbRating}</div>
                </>
            }
            <Link to="/">Back</Link>
        </>
    )
}

export default Movie
