import React from 'react'
import {Link} from 'react-router-dom';
import '../css/movies.css';

const Movies = ({movies}) => {
    console.log(movies)
    const IMG_API = 'https://image.tmdb.org/t/p/w1280/';
    return (
        // <div style={moviesContainer} className="moviesContainer">
        //     {movies === 0 || movies === undefined ? '' : movies.map((movie) => (
        //         <Link to={{pathname: `./${movie.imdbID}`, state: {movies}}} key={movie.imdbID} style={movieLinkContainer}>
        //             <h3>{movie.Title}</h3>
        //             <div style={{marginBottom: '10px'}}>{movie.Year}</div>
        //             <img src={movie.Poster} alt="poster" style={{margin: 'auto'}} />
        //         </Link>
        //     ))}          
        // </div>
        <div className="moviesContainer">
            {movies !== undefined && movies.length !== 0 ? movies.map((movie) => (
                <Link to={`./${movie.id}`} key={movie.id} className="movieLinkContainer">
                    <img src={IMG_API + movie.poster_path} alt={movie.title} className="posterStyle"/>
                    <div className="movieInfo">
                        <h3>{movie.title}</h3>
                        <div className="rating">{movie.vote_average}</div>
                    </div>
                </Link>
            )) : ''}
        </div>
    )
}


export default Movies
