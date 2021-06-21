import React from 'react';
import { Typography ,Container, GridList, GridListTile, GridListTileBar, makeStyles } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    gridList: {
        flexWrap: 'nowrap',
        height: 400 
    },
}));

const TrendingMovies = ({movies}) => {
    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Typography align="center" variant="h5" style={{color: 'white'}} gutterBottom={true}>Last Week Trending Films</Typography>
            <GridList cols={3} className={classes.gridList}>
                {movies.map(movie => (
                    <GridListTile key={movie.id} component={RouterLink} to={`/movies/${movie.id}`} style={{height: '100%'}}>
                        <img src={IMG_API + movie.poster_path} alt={movie.title} />
                        <GridListTileBar title={movie.title}/>
                    </GridListTile>
                ))}
            </GridList>
        </Container>
    )
}

export default TrendingMovies
