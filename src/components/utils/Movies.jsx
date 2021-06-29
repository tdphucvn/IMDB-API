import React, { useState, useEffect } from 'react'
import { Typography, Button, Card, Grid, Container,  CardMedia, CardContent, makeStyles, useScrollTrigger, Zoom, Fab, Badge } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    header: {
        minHeight: '100px',
    },
    toTopButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    container: {
        zIndex: 2,
    },
    cardContent: {
        '& *': {
            // color: 'white'
        }
    },
    ratingBadge: {
        color: '#73620F',
        '& .MuiBadge-anchorOriginTopRightRectangle': {
            backgroundColor: '#FFDC28',
            padding: '2px 8px'
        }
    },
    moreButton: {
        margin: 'auto',
        marginTop: theme.spacing(3)
    }
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
    const rate = movie.vote_average;

    return (
        <Typography>{rate}</Typography>
    )
} 

const Movies = ({movies, props}) => {
    const classes = useStyles();
    const { response } = useSelector((state) => state.genre);

    const middleIndex = Math.floor(movies.length / 2);
    const secondPartArray = movies.slice(middleIndex, movies.length);

    const [moviesToDisplay, setMoviesToDisplay] = useState([]);

    const [secondPartDisplayed, setSecondPartDisplayed] = useState(false);

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    const handleShowMore = () => {
        setSecondPartDisplayed((state) => !state);
    };

    useEffect(() => {
        if(secondPartDisplayed && moviesToDisplay.length > 0) { setMoviesToDisplay([...moviesToDisplay, ...secondPartArray]) };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondPartDisplayed])

    useEffect(() => {
        const ar = movies.slice(0, middleIndex);
        secondPartDisplayed ? setSecondPartDisplayed(false) : setSecondPartDisplayed(false);
        setMoviesToDisplay([...ar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    console.log(moviesToDisplay);

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container justify="flex-start" spacing={4}>
                    {moviesToDisplay.map((movie) => {
                        const {title, release_date} = movie;
                        let activeCardGenres = [];
                        if(movie.genre_ids && response) {
                            movie.genre_ids.forEach(index => {
                                const genre = response.filter(i => i.id === index);
                                activeCardGenres.push(...genre);
                            });
                        };
                        return(
                        <Grid item xs={12} sm={6} md={3} key={movie.id}>
                            <Badge badgeContent={rating(movie)} className={classes.ratingBadge}>
                                <Card style={{backgroundColor: 'transparent'}}>
                                    {/* <CardHeader title={movie.title} subheader={rating(movie)} className={classes.header}/> */}
                                    <CardMedia component="img" src={IMG_API + movie.poster_path} style={{height: '50vh', maxHeight: '600px'}}/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography varaint="body2" color="textSecondary">
                                            {release_date && release_date.substring(0,4)} / {activeCardGenres[0] && activeCardGenres[0].name}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" paragraph>
                                            {title ? title : 'No title'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Badge>
                        </Grid>
                        )
                    })}
                </Grid>                
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button color="secondary" onClick={handleShowMore} variant="outlined" size="large" className={classes.moreButton}>Show more</Button>
                </div>
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
