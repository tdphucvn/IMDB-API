import React, {useEffect, useState} from 'react'
import { Container, Typography, Card, CardMedia, CardContent, makeStyles, Grid } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';


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
    },
    peopleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
    }
}));

const PopularFamousPeople = ({actors, searchActor}) => {
    const [searchQueryActor, setSearchQueryActor] = searchActor;

    const classes = useStyles();

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    const handleSearchFamousPeople = (e) => {
        e.preventDefault();
        const { searchPeople } = Object.fromEntries(new FormData(e.target).entries());
        e.target.reset();
        setSearchQueryActor(searchPeople);
    };

    return (
        <div>
            <Container>
                <div className={classes.peopleHeader}>
                    <Typography variant="h4" gutterBottom={true}>
                        Popular People
                    </Typography>
                    <form id="searchFamousPeople" className={classes.search} onSubmit={handleSearchFamousPeople}>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <TextField placeholder="Search" name="searchPeople" className={classes.searchInput}/>
                    </form>
                </div>
                <Grid container spacing={3} className={classes.famousPeopleContainer}>
                    {actors && actors.map(actor => (
                        <Grid item xs={12} sm={6} md={3}  key={actor.id}>
                            <Card component={RouterLink} to={`/person/${actor.id}`} className={classes.personLink}>
                                <CardMedia component="img" src={actor.profile_path !== null ? IMG_API + actor.profile_path : ''}></CardMedia>
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
