import { React, useState, useEffect } from 'react';
import { Container, makeStyles, Typography, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import DiscoverBar from './DiscoverBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2),        
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

const DiscoverHeader = ({state, moviesComponent, loading}) => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = state;
    const [genres, setGenres] = useState([]);
    const [value, setValue] = moviesComponent;
    const [innerValue, setInnerValue] = useState(0);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

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
        setTimeout(function(){setValue(newValue); setSearchQuery([])}, 500);
    };

    const handleCutomDiscover = () => {
        accordionExpanded ? setAccordionExpanded(false) : setAccordionExpanded(true);
    };

    return (
        <>
            <Container maxWidth="lg" className={classes.container} id="discover-container">
                <div className={classes.discoverNavigation}>
                    <Typography variant="h4" gutterBottom={false}>DISCOVER LATEST TRENDING MOVIES</Typography>
                    <Tabs value={innerValue} indicatorColor="secondary" onChange={handleTabChange} className={classes.discoverTabs} centered={true}>
                        <Tab label="Trending" disabled={accordionExpanded}/>
                        <Tab label="Revenue" disabled={accordionExpanded}/>
                        <Tab label="Latest" disabled={accordionExpanded}/>
                    </Tabs>
                </div>
                <Accordion onChange={() => handleCutomDiscover()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="h6">Custom Search Options</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'block'}}>
                        <DiscoverBar state={state} genresProps={[genres, setGenres]} accordion={accordionExpanded}/>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </>
    )
}

export default DiscoverHeader
