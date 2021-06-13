import React from 'react'
import {Link as RouterLink} from 'react-router-dom';
import { Typography, Button, Card, Grid, Container, CardHeader, CardMedia, CardContent, CardActions, makeStyles, useScrollTrigger, Zoom, Fab } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    header: {
        minHeight: '100px',
    },
    cardContent: {
        minHeight: '80px',
    },
    toTopButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 1000,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
        
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.toTopButton}>
          {children}
        </div>
      </Zoom>
    );
};

const rating = (movie) => {
    const rate = movie.vote_average / 2;

    return (
        <div>
            <Rating defaultValue={rate} precision={0.1} readOnly max={5}/>
        </div>
    )
}

const Movies = ({movies, props}) => {
    const classes = useStyles();

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';
    return (
        <>
            <Container maxWidth="lg">
                <Grid container justify="flex-start" spacing={3}>
                    {movies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <Card>
                                <CardHeader title={movie.title} subheader={rating(movie)} className={classes.header}/>
                                <CardMedia component="img" src={IMG_API + movie.poster_path}/>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        {movie.overview.length > 100 ? movie.overview.substring(0,100) + '...' : movie.overview}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color="primary" component={RouterLink} to={`/movie/${movie.id}`}>More</Button>
                                    <Button color="secondary">Trailer</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}


export default Movies
