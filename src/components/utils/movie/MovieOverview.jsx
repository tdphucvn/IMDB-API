import React from 'react';
import { Typography, makeStyles, Container, CircularProgress, Box, Button, Grid } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link as RouterLink } from 'react-router-dom';


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
        padding: 30,
        color: 'white'
    },
    personLink: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1.3rem', 
        '&:hover': {
            opacity: 0.7
        }
    },
    marginVertical: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2), 
    }
}));

const MovieOverview = ({movieData, trailer, crewMembers}) => {
    const classes = useStyles();
    const getKey = (arr) => {
        if(arr === undefined || arr.length === 0) return [{key: 'none'}];
        if(arr !== undefined) return arr[0];
    };
    const {key} = getKey(trailer);
    const {backdrop_path: backdrop, poster_path: poster, genres, overview, vote_average: vote, release_date: release, title, production_countries: countries, runtime, tagline } = movieData;
    const IMG_API_BACKDROP = 'https://image.tmdb.org/t/p/original/';
    const IMG_API_POSTER = 'https://image.tmdb.org/t/p/w500/';

    console.log(crewMembers)

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
                            <Typography variant="h4" className={classes.marginVertical}>{title} <span style={{opacity: 0.5}}>({release && release.substring(0,4)})</span></Typography>
                            <Typography variant="body1"  className={classes.marginVertical}>{release} / <span>{countries && countries.map((country, countryIndex) => (<span key={countryIndex}>{country.name}</span>))}</span> / <span>{genres && genres.map((genre, genreIndex) => (<span key={genreIndex}>{genre.name}{genres.length-1 > genreIndex ? ', ' : ''}</span>))}</span> / <span>{runtime && runtime + ' min'}</span></Typography>
                            <Typography variant="body2" style={{opacity: 0.5, fontSize: '1.4rem'}}  className={classes.marginVertical} component="i">{tagline}</Typography>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}  className={classes.marginVertical}>
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
                            <Typography variant="h5" className={classes.marginVertical} style={{marginBottom: '0px'}}>Overview</Typography>
                            <Typography variant="body1" className={classes.marginVertical}>{overview && overview}</Typography>
                            <Grid container spacing={3} className={classes.marginVertical}>
                                {crewMembers.map((member, memberIndex) => (
                                    <Grid key={memberIndex} item md={4} xs={6}>
                                        <Typography component={RouterLink} to={`/person/${member.id}`} className={classes.personLink}>{member.name}</Typography>
                                        <Typography style={{opacity: 0.5}}>{member.job}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Container>
                </div>
            }
        </React.Fragment>
    )
}

export default MovieOverview
