import { React, useState, useEffect } from 'react';
import { Container, makeStyles, Typography, Tabs, Tab, Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@material-ui/core';
import DiscoverBar from './DiscoverBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2),
        color: 'white',
    },
    discoverTabs: {
        width: '50%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    discoverNavigation: {
        marginBottom: theme.spacing(3),
    }
}));

const DiscoverHeader = ({state, moviesComponent}) => {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const [value, setValue] = moviesComponent;
    const [innerValue, setInnerValue] = useState(0);
    const [customDiscover, setCustomDiscover] = useState(false);

    const getGenre = () => {
        const fetchGenre = async () => {
            const URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US";
            const defaultFetchGenre = async () => {
                await fetch(URL, {method: 'GET', contentType: 'application/json'})
                    .then((res) => {
                        if(res.ok) return res.text();
                        return res.text().then(err => {
                        return Promise.reject({
                            status: res.status,
                            statusText: res.statusText,
                            errorMessage: err,
                        });
                        });
                    })
                    .then((data) => {
                        const rawData = JSON.parse(data);
                        const dataEdit = rawData.genres.map((genre) => {
                            genre.state = false;
                            return genre;
                        });
                        setGenres(dataEdit);
                    })
                    .catch((err) => {
                    console.log(err);
                    });
            };
            defaultFetchGenre();
        };
        fetchGenre()
    };

    useEffect(() => {
        getGenre();
    }, []);


    const handleTabChange = (event, newValue) => {
        setInnerValue(newValue);
        setTimeout(function(){setValue(newValue)}, 500);
    };

    const handleCutomDiscover = () => {
        customDiscover ? setCustomDiscover(false) : setCustomDiscover(true);
    };

    return (
        <>
            <Container maxWidth="lg" className={classes.container} id="discover-container">
                <div className={classes.discoverNavigation}>
                    <Typography variant="h4" style={{color: 'white'}} gutterBottom={false}>Discover latest movies</Typography>
                    <Tabs value={innerValue} indicatorColor="secondary" onChange={handleTabChange} className={classes.discoverTabs} centered={true}>
                        <Tab label="Trending" style={{color: 'white'}}/>
                        <Tab label="Revenue" style={{color: 'white'}}/>
                        <Tab label="Latest" style={{color: 'white'}}/>
                    </Tabs>
                </div>
                <Accordion onChange={handleCutomDiscover} style={{color: 'white', background: 'transparent', borderBottom: '1px solid white'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}>
                        <Typography variant="h6">Custom Search Options</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'block'}}>
                        {customDiscover && <DiscoverBar state={state} genresProps={[genres, setGenres]}/>}
                    </AccordionDetails>
                </Accordion>
            </Container>
        </>
    )
}

export default DiscoverHeader