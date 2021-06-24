import React, {useEffect, useState} from 'react'
import { Container, Typography, Card, CardMedia, CardContent, makeStyles, Grid, InputBase } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    personLink: {
        textDecoration: 'none', 
        color: 'white'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        height: '100%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        pointerEvents: 'none'
    },
    searchInput: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    }
}));

const PopularFamousPeople = ({actors}) => {
     
    const classes = useStyles();

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    console.log(actors)
    return (
        <div>
            <Container>
                <div className={classes.peopleHeader}>
                    <Typography variant="h4" gutterBottom={true}>
                        Popular People
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <InputBase placeholder="Search" className={classes.searchInput}/>
                    </div>
                </div>
                <Grid container spacing={3} className={classes.famousPeopleContainer}>
                    {actors && actors.map(actor => (
                        <Grid item xs={12} sm={6} md={3}  key={actor.id}>
                            <Card component={RouterLink} to={`/person/${actor.id}`} className={classes.personLink}>
                                <CardMedia component="img" src={IMG_API + actor.profile_path}></CardMedia>
                                <CardContent>
                                    <Typography variant="h6">{actor.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default PopularFamousPeople
