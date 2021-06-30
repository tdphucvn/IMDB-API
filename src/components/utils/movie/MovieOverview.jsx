import React from 'react';
import { Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    slider: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'linear-gradient(to right, #0d253f, transparent)',
        opacity: 0.7
    },
    movieInfoContainer: {
        height: '100%',
        '& *': {
            height: 'inherit'
        },
        display: 'flex',
        zIndex: '3',
        position: 'relative',
    }
}));

const MovieOverview = ({movieData}) => {
    const classes = useStyles();

    const {backdrop_path: backdrop, poster_path: poster, budget, genres, homepage, id: movieID, overview, vote_average: vote, release_date: release, title } = movieData;
    const IMG_API_BACKDROP = 'https://image.tmdb.org/t/p/original/';
    const IMG_API_POSTER = 'https://image.tmdb.org/t/p/w500/';

    return (
        <React.Fragment>
            {movieData && 
                <div style={{backgroundImage: `url(${IMG_API_BACKDROP + backdrop})`, height: 'calc(100vh - 88px)', backgroundSize: 'cover', position: 'relative'}}>
                    <div className={classes.slider}></div>
                    <Container maxWidth="lg" className={classes.movieInfoContainer}>
                        <div className={classes.moviePoster}>
                            <img src={IMG_API_POSTER + poster} alt="" />
                        </div>
                        <div className={classes.movieInfo}>
                            <Typography variant="h4">{title} ({release.substring(0,4)})</Typography>
                            <Typography variant="body1">{release}</Typography>
                        </div>
                    </Container>
                </div>
            }
        </React.Fragment>
    )
}

export default MovieOverview
