import { React, useEffect, useState } from 'react';
import { Button, Container, Divider, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

const Test = () => {
    const classes = useStyles();
    const [activeCardIndex, setActiveCardIndex] = useState(2);
    const [activeCards, setActiveCards] = useState([]);
    const [cards, setCards] = useState([
        {
            text: 'first',
        },
        {
            text: 'second',
        },
        {
            text: 'third',
        },
        {
            text: 'forth',
        },
        {
            text: 'fifth',
        },
        {
            text: 'sixth',
        },
        {
            text: 'seventh',
        },
    ]);

    useEffect(() => {
        renderCards(activeCardIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCardIndex]);

    const handleBack = () => {
        if(activeCardIndex === 0) return;
        setActiveCardIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        console.log(cards.length)
        if(activeCardIndex > cards.length - 1) return;
        setActiveCardIndex((prevIndex) => prevIndex + 1);
    };

    const renderCards = (index) => {
        let nums = [];
        let cardsArray = []
        if(index < 2) {
            for (let i = 0; i <= index + 2; i++){
                nums.push(i);
            }    
        } else {
            for (let i = (index - 2); i <= index + 2; i++){
                console.log(i)
                nums.push(i);
            }    
        }
        nums.forEach(num => {
            cardsArray.push(cards[num]);
        });
        console.log(cardsArray)
    };

    return (
        <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Test
