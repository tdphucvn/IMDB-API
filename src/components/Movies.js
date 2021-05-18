import React from 'react'
import {Link} from 'react-router-dom';

const Movies = ({movies}) => {
    
    return (
        <div>
            {movies === 0 || movies === undefined ? '' : movies.map((movie) => (
                <Link to={`./${movie.imdbID}`} key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <div>{movie.Year}</div>
                    <img src={movie.Poster} alt="poster" />
                </Link>
            ))}          
        </div>
    )
}

export default Movies
