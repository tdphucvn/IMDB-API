import React, {useState, useEffect} from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    profileImage: {
        height: 500,
        maxHeight: '70vh',
        '& img': {
            borderRadius: 5,
            height: '100%'
        }
    },

}));

const ActorDetails = ({data}) => {
    const [knownForMovies, setKnownForMovies] = useState([]);

    const {biography, birthday, known_for_department: department, name, place_of_birth: place, profile_path} = data;

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
                        <div className={classes.birthday}>
                            <Typography variant="body2">Birthday: { birthday }</Typography>
                        </div>
                        <div className={classes.place}>
                            <Typography variant="body2">Birth place: { place }</Typography>
                        </div>
                        <div className={classes.department}>
                            <Typography variant="body2">Working in: { department }</Typography>
                        </div>
                    </div>
                    <div className={classes.secondColumn}>
                        <div className={classes.biography}>
                            <Typography variant="h4">
                                {name}
                            </Typography>
                            <Typography variant="body2" paragraph gutterBottom={true}>
                                {biography}
                            </Typography>
                        </div>
                        <div className={classes.knownFor}>
                            { knownForMovies && knownForMovies.map((movie) => (
                               <div className={classes.profileImage} key={movie.id}>
                                   <img src={IMG_API + movie.poster_path} alt="" />
                               </div> 
                            )) }
                        </div>
                    </div>
            </Container>
        </React.Fragment>
    )
}

export default ActorDetails
