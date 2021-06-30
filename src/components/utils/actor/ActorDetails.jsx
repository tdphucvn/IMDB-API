import React, {useState, useEffect} from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import TrendingMovies from '../search/TrendingMovies';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '50px auto'
    },
    profileImage: {
        height: 500,
        maxHeight: '70vh',
        '& img': {
            borderRadius: 5,
            height: '100%'
        }
    },
    biography: {
        padding: '0 24px'
    },
    personalInfo: {
        margin: '15px 0'
    }
}));

const ActorDetails = ({data}) => {
    const [knownForMovies, setKnownForMovies] = useState([]);

    const {biography, birthday, known_for_department: department, name, place_of_birth: place, profile_path, gender} = data;

    const classes = useStyles();

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const fetchDataPerson = async () => {
            const URL = `https://api.themoviedb.org/3/search/person?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&query=${name}&page=1&include_adult=false`
            const method = {method: 'GET', contentType: 'application/json'};
            return await fetch(URL, method)
                .then((res) => {
                    if(res.ok) return res.json();

                })
                .then((data) => {
                    if(data === undefined) return;
                    const { results } = data;
                    const { known_for: knownFor } = results[0];
                    setKnownForMovies(knownFor);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchDataPerson();   
    }, [name]);

    return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.container}>
                    <div className={classes.firstColumn}>
                        <div className={classes.profileImage}>
                            <img src={IMG_API + profile_path} alt="" />
                        </div>
                        <div className={classes.personalInfo}>
                            <Typography variant="h6">Birthday:</Typography>
                            <Typography variant="body2">{birthday}</Typography>
                        </div>
                        <div className={classes.personalInfo}>
                            <Typography variant="h6">Place of Birth:</Typography>
                            <Typography variant="body2">{place}</Typography>
                        </div>
                        <div className={classes.personalInfo}>
                            <Typography variant="h6">Working in:</Typography>
                            <Typography variant="body2">{department}</Typography>
                        </div>
                        <div className={classes.personalInfo}>
                            <Typography variant="h6">Gender</Typography>
                            <Typography variant="body2">{gender === 1 ? 'Female' : 'Male'}</Typography>
                        </div>
                    </div>
                    <div className={classes.secondColumn}>
                        <div className={classes.biography}>
                            <Typography variant="h4" gutterBottom={true}>
                                {name}
                            </Typography>
                            <Typography variant="h6" gutterBottom={true}>Biography</Typography>
                            <Typography variant="body2" paragraph gutterBottom={true}>
                                {biography}
                            </Typography>
                        </div>
                        <div className={classes.knownFor}>
                            <Typography variant="h5" style={{padding: '0 24px', marginTop: '50px'}}>Known For: </Typography>
                            <TrendingMovies movies={knownForMovies} />
                        </div>
                    </div>
            </Container>
        </React.Fragment>
    )
}

export default ActorDetails
