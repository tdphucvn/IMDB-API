import { React, useEffect, useState } from 'react';
import { Button, Container, Divider, Paper, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    innerContainer: {
        display: 'flex',
        height: '30vh',
        justifyContent: 'space-around'
    },
    filmContainer: {
        width: '15%',
        
    },
    currentFilm: {
        width: '25%',
    }
}));

const Test = () => {
    const classes = useStyles();
    const [activeCardIndex, setActiveCardIndex] = useState(2);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [backDisabled, setBackDisabled] = useState(false);
    const [activeCards, setActiveCards] = useState([]);
    const [cards, setCards] = useState([
        {
            index: 1,
            text: 'first',
        },
        {
            index: 2,
            text: 'second',
        },
        {
            index: 3,
            text: 'third',
        },
        {
            index: 4,
            text: 'forth',
        },
        {
            index: 5,
            text: 'fifth',
        },
        {
            index: 6,
            text: 'sixth',
        },
        {
            index: 7,
            text: 'seventh',
        },
    ]);

    useEffect(() => {
        renderCards(activeCardIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCardIndex]);

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
                    const emptyObject = {text: 'Nekecej', index: Math.floor(Math.random() * 1000)};
                    cardsArray.unshift(emptyObject);
                    console.log(cardsArray);
                };
            } else {
                while (cardsArray.length < 5){
                    const emptyObject = {text: 'Nekecej', index: Math.floor(Math.random() * 1000)};
                    cardsArray.push(emptyObject);
                };    
            }
        };
        setActiveCards([]);
        setActiveCards(cardsArray);
        cardsArray.forEach((card) => {
            console.log(card);
        });  
    };



    return (
        <div className={classes.outerContainer}>
            <Button onClick={handleBack} disabled={backDisabled}>Back</Button>
            <Container maxWidth="lg" className={classes.innerContainer}>
                {/* {activeCards.map((activeCard) => (
                    <Paper className={classes.filmContainer} key={activeCard.index}><Typography>{activeCard.text}</Typography></Paper>
                ))} */}
                {activeCards.map((activeCard) => {
                    if(activeCard === cards[activeCardIndex]) return (<Paper className={classes.currentFilm} key={activeCard.index}><Typography>{activeCard.text}</Typography></Paper>);
                    return(<Paper className={classes.filmContainer} key={activeCard.index}><Typography>{activeCard.text}</Typography></Paper>);
                })}
            </Container>
            <Button onClick={handleNext} disabled={nextDisabled}>Next</Button>
        </div>
    )
}

export default Test
