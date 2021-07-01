import React from 'react';
import { Typography, makeStyles, Container, CircularProgress, Box, Button } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const useStyles = makeStyles((theme) => ({
    slider: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        // background: 'linear-gradient(to right, #0d253f, transparent)',
        background: '#0d253f',
        opacity: 0.6
    },
    movieInfoContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: '3',
        position: 'relative',
    },
    moviePoster: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            height: '80%',
            borderRadius: 10
        }, 
    },
    movieInfo: {
        flex: 2,
        padding: 20,
        color: 'white'
    }
}));

const MovieOverview = ({movieData, trailer}) => {
    const {key} = trailer[0];
    const classes = useStyles();
    const {backdrop_path: backdrop, poster_path: poster, budget, genres, homepage, id: movieID, overview, vote_average: vote, release_date: release, title, production_countries: countries, runtime } = movieData;
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
                            <Typography variant="h4">{title} ({release && release.substring(0,4)})</Typography>
                            <Typography variant="body1" gutterBottom={true}>{release} / <span>({countries && countries.map((country, countryIndex) => (<span key={countryIndex}>{country.name}</span>))})</span> / <span>{genres && genres.map((genre, index) => (<span>{genre.name}{genres.length-1 > index ? ', ' : ''}</span>))}</span> / <span>{runtime && runtime + 'min'}</span></Typography>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <div style={{position: 'relative', display: 'inline-flex'}}>
                                    <CircularProgress variant="determinate" value={vote * 10} size="3.8rem" color="secondary" thickness={5}/>
                                    <Box
                                        top={0}
                                        left={0}
                                        bottom={0}
                                        right={0}
                                        position="absolute"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Typography component="div" style={{color: 'white', fontSize: '1rem'}}>{vote * 10}%</Typography>
                                    </Box>
                                </div>
                                <Button color="secondary" startIcon={<PlayCircleFilledIcon />} variant="contained" component="a" href={`https://www.youtube.com/watch?v=${key}`} target="_blank" style={{padding: '9px 16px', marginLeft: 15}}>Play Trailer</Button>
                            </div>
                            <Typography variant="h5">Overview</Typography>
                            <Typography variant="body1">{overview && overview}</Typography>
                        </div>
                    </Container>
                </div>
            }
        </React.Fragment>
    )
}

export default MovieOverview
