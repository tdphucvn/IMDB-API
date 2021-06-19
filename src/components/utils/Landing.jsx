import { React, useEffect, useState } from 'react';
import { Button, Container, Divider, Paper, makeStyles, Typography, GridList, GridListTile, TableContainer, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
        background: '#000021',
        position: 'relative',
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center', 
        position: 'relative',
        flexWrap: 'wrap',
        height: '100vh',
    },
    filmContainer: {
        width: '15vw',
        height: '40vh',
        minWidth: 100,
        background: 'black'
    },
    filmContainerTransparent: {
        width: '15vw',
        height: '40vh',
        minWidth: 100,
        background: 'transparent'
    },
    currentFilm: {
        width: '41vw',
        height: '65vh',
        zIndex: 100,
        position: 'absolute',
        top: 'calc(50%)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    listTile: {
        // transform: 'scale(calc(1/1.8))',
        
    },
    content: {
        display: 'flex',
        height: '100%',
        borderRadius: '5px',
    },
    contentImage: {
        flex: 1,
        borderRadius: '5px 0 0 5px',
        overflow: 'hidden',
    },
    contentDescription: {
        flex: 1.5,
        borderRadius: '0 5px 5px 0',

    },
    button: {
        height: 64,
        width: 64,
        borderRadius: '50%',
        position: 'absolute',
        color: 'white',
        border: '1px solid white',
        zIndex: '999',
        background: 'rgba(255, 255, 255, 0.300)',
    },
    backButton: {
        top: 'calc(50%)',
        left: '7%',
        transform: 'translate(0, -50%)',
    },
    nextButton: {
        top: 'calc(50%)',
        right: '7%',
        transform: 'translate(0, -50%)',
    },
    actionButtons: {
        display: 'flex',
    },
    slider: {
        width: '98vw',
        height: '50vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        background: '#000021',
        opacity: 0.5,
    }
}));

const Landing = () => {
    const classes = useStyles();
    const [activeCardIndex, setActiveCardIndex] = useState(2);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [backDisabled, setBackDisabled] = useState(false);
    const [activeCards, setActiveCards] = useState([]);
    const [cards, setCards] = useState([]);

    const defaultFetch = async () => {
        const URL = "https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&sort_by=popularity.desc";
        const defaultFetchData = async () => {
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
              setCards(rawData.results)
            })
            .catch((err) => {
              console.log(err);
            });
        };
        defaultFetchData();
    };

    useEffect(() => {
        defaultFetch();
    }, [])

    useEffect(() => {
        renderCards(activeCardIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCardIndex, cards]);

    const handleBack = () => {
        if(activeCardIndex === 0) {return};
        if(nextDisabled) setNextDisabled(false);
        const newIndex = activeCardIndex - 1;
        setActiveCardIndex((prevIndex) => prevIndex - 1);
        if(newIndex === 0) setBackDisabled(true);
    };

    const handleNext = () => {
        if(activeCardIndex >= cards.length - 1) {return};
        if(backDisabled) setBackDisabled(false);
        const newIndex = activeCardIndex + 1;
        setActiveCardIndex((prevIndex) => prevIndex + 1);
        if(newIndex >= cards.length - 1) setNextDisabled(true);
    };

    const renderCards = (index) => {
        if(cards.length === 0) return;
        let nums = [];
        let cardsArray = []
        if(index < 2) {
            for (let i = 0; i <= index + 2; i++){
                nums.push(i);
            };
        } else {
            for (let i = (index - 2); i <= index + 2; i++){
                nums.push(i);
            };  
        };
        nums.forEach(num => {
            if(cards[num] === undefined) return;
            cardsArray.push(cards[num]);
        });
        if(cardsArray.length < 5) {
            if (cardsArray[0] === cards[0] || cardsArray[0].text === 'Nekecej'){
                while (cardsArray.length < 5){
                    const emptyObject = {overview: '', id: Math.floor(Math.random() * 1000)};
                    cardsArray.unshift(emptyObject);
                    console.log(cardsArray);
                };
            } else {
                while (cardsArray.length < 5){
                    const emptyObject = {overview: '', id: Math.floor(Math.random() * 1000)};
                    cardsArray.push(emptyObject);
                };    
            }
        };
        setActiveCards([]);
        setActiveCards(cardsArray);
    };

    const IMG_API = 'https://image.tmdb.org/t/p/w500/';

    const { response } = useSelector((state) => state.genre);

    return (
        <div className={classes.outerContainer}>
            <div className={classes.slider}></div>
            <Typography align="center" variant="h5" style={{color: 'white', position: 'absolute', top: '6vh', width: '100%'}}>Our weekly film suggestion exclusively for you!</Typography>
            <Container style={{maxWidth: '100%'}} className={classes.innerContainer}>
            <Button onClick={handleBack} disabled={backDisabled} className={`${classes.backButton} ${classes.button}`} variant="outlined"><ArrowBackIcon /></Button>

                {activeCards.map((activeCard) => {
                    if(activeCard === cards[activeCardIndex]){
                        let activeCardGenres = [];
                        if(activeCard.genre_ids && response) {
                            activeCard.genre_ids.forEach(index => {
                                const genre = response.filter(i => i.id === index);
                                activeCardGenres.push(...genre);
                            });
                        };
                        return (
                            <div key={activeCard.id}>
                                <div className={classes.filmContainer} style={{width: '20vw'}}></div>
                                <Paper className={classes.currentFilm} elevation={20}>
                                    <div className={classes.content}>
                                        <GridList cols={2} style={{width: '100%', margin: 0}}>
                                            <GridListTile style={{height: '100%', paddingRight: '0px'}} className={classes.contentImage}>
                                                <img src={IMG_API + activeCard.poster_path} alt="" />
                                            </GridListTile>
                                            <GridListTile style={{height: '100%'}} className={classes.contentDescription}>
                                                <div style={{maxWidth: '90%', margin: 'auto', position: 'relative', height: '100%'}}>
                                                    <Typography color="textPrimary" variant="h4" style={{margin: '15px 0'}}>{activeCard.title}</Typography>
                                                    <Divider></Divider>
                                                    <TableContainer>
                                                        <Table aria-label="simple table">
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell style={{padding: '8px 16px', border: 'none'}}>Genre:</TableCell>
                                                                    <TableCell style={{padding: '8px 16px', border: 'none'}}>{activeCardGenres.map((genre) => (`${genre.name}, `))}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell style={{padding: '8px 16px', border: 'none'}}>Release Date:</TableCell>
                                                                    <TableCell style={{padding: '8px 16px', border: 'none'}}>{activeCard.release_date}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell style={{padding: '8px 16px', border: 'none'}}>Overview</TableCell>
                                                                    <TableCell align="left" style={{padding: '8px 16px', border: 'none'}}>{activeCard.overview.length > 100 ? activeCard.overview.substring(0, 97) + '...' : activeCard.overview}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    <div style={{width: '100%', minHeight: 100, height: '25%', position: 'absolute', bottom: 0, display: 'flex', borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
                                                        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                                            <Typography variant="h4">{Math.floor(activeCard.popularity)}</Typography>
                                                            <Typography>Popularity</Typography>
                                                        </div>
                                                        <Divider orientation="vertical"></Divider>
                                                        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                                            <Rating value={activeCard.vote_average / 2} precision={0.1} max={5} readOnly/>
                                                            <Typography>IMDB Rating</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </GridListTile>
                                        </GridList>
                                    </div>
                                </Paper>
                            </div>
                        );
                    };
                    if (activeCard.overview !== '')
                    return(<Paper className={classes.filmContainer} key={activeCard.id} elevation={10}>
                        <GridList style={{height: '100%'}}>
                            <GridListTile style={{width: '100%', height: '100%'}}>
                                <img src={IMG_API + activeCard.poster_path} alt="" />
                            </GridListTile>
                        </GridList>
                    </Paper>);
                    return(
                        <div key={activeCard.id} className={classes.filmContainerTransparent}></div>
                    );
                })}
            <Button onClick={handleNext} disabled={nextDisabled} className={`${classes.nextButton} ${classes.button}`} variant="outlined"><ArrowForwardIcon /></Button>
            </Container>
        </div>
    )
}

export default Landing
