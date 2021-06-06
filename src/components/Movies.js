import React from 'react'
import {Link} from 'react-router-dom';

const Movies = ({movies}) => {

    return (
        <div style={moviesContainer} className="moviesContainer">
            {movies === 0 || movies === undefined ? '' : movies.map((movie) => (
                <Link to={{pathname: `./${movie.imdbID}`, state: {movies}}} key={movie.imdbID} style={movieLinkContainer}>
                    <h3>{movie.Title}</h3>
                    <div style={{marginBottom: '10px'}}>{movie.Year}</div>
                    <img src={movie.Poster} alt="poster" style={{margin: 'auto'}} />
                </Link>
            ))}          
        </div>
    )
}

const moviesContainer = {
    width: '80vw',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

const movieLinkContainer = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '25%',
    minWidth: '20%',
    minHeight: '20vh',
    textAlign: 'center',
    margin: '1em',
    overflowY: 'hidden',
    textDecoration: 'none',
    color: 'black',
}

export default Movies
