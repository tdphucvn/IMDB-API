import React from 'react';
import { Typography, makeStyles, Container, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    castGridList: {
        flexWrap: 'nowrap',
        height: 230,
        '& a': {
            textDecoration: 'none',
            color: 'black',
            [theme.breakpoints.down('md')]: {
                minWidth: 150,
            }
        },
        [theme.breakpoints.down('md')]: {
            width: 'calc(100vw - 40px)',
        }
    },
    movieGridList: {
        flexWrap: 'nowrap',
        height: 350,
        '& a': {
            textDecoration: 'none',
            color: 'black',
            [theme.breakpoints.down('md')]: {
                minWidth: 200,
            }
        },
        [theme.breakpoints.down('md')]: {
            width: 'calc(100vw - 40px)',
        }
    },
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexWrap: 'wrap',
    },
    firstColumn: {
        flex: 5,
    },
    secondColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
        }
    },
    factHeader: {
        fontSize: '1.2rem',
        fontWeight: 'bold'
    }
}));

const IMG_API = 'https://image.tmdb.org/t/p/w500/';

const MovieCast = ({cast, movieData, recommendation}) => {
    const classes = useStyles();
    const { budget, homepage, revenue, original_language: language, status } = movieData;

    const {results: movies} = recommendation;

    return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.firstColumn}>
                    <div>
                        <Typography variant="h5" gutterBottom={true}>Top Billed Cast</Typography>
                        <GridList cols={6.5} className={classes.castGridList}>
                            {cast.map(member => (
                                <GridListTile key={member.id} component={RouterLink} to={`/person/${member.id}`} style={{height: '100%'}}>
                                    <img src={IMG_API + member.profile_path} alt="profile_picture" />
                                    <GridListTileBar title={member.name} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    {movies && movies.length > 0 && 
                        <div style={{marginTop: 50}}>
                            <Typography variant="h5" gutterBottom={true}>Recommended Movies You Should Watch</Typography>
                            <GridList cols={4.5} className={classes.movieGridList}>
                                {movies && movies.map(movie => (
                                    <GridListTile key={movie.id} component={RouterLink} to={`/movie/${movie.id}`} style={{height: '100%'}}>
                                        <img src={IMG_API + movie.poster_path} alt="poster_image" />
                                        <GridListTileBar title={movie.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>                
                    }
                </div>
                <div className={classes.secondColumn}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton component="a" href={`${homepage}`} target="_blank">
                            <LinkIcon />
                        </IconButton>
                        <Typography>Homepage</Typography>
                    </div>
                    <div>
                        <Typography className={classes.factHeader}>Status</Typography>
                        <Typography>{status}</Typography>
                    </div>
                    <div>
                        <Typography className={classes.factHeader}>Budget</Typography>
                        <Typography>${budget}</Typography>
                    </div>
                    <div>
                        <Typography className={classes.factHeader}>Revenue</Typography>
                        <Typography>${revenue}</Typography>
                    </div>
                    <div>
                        <Typography className={classes.factHeader}>Language</Typography>
                        <Typography>{language}</Typography>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default MovieCast
