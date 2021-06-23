import React, {useEffect, useState} from 'react'
import { Container, Typography, Card, Paper, makeStyles } from '@material-ui/core';


const PopularFamousPeople = ({actors}) => {
     
    

    return (
        <div>
            {actors && actors.length > 0 && actors.map(actor => (
                <Container key={actor.id}>
                    <div key={actor.id}><Typography style={{color: 'white'}} variant="h4">{actor.name}</Typography></div>
                    <div>
                        <Typography paragraph={true} gutterBottom={true} style={{color: 'white'}}>{actor.biography}</Typography>
                    </div>
                </Container>
            ))}
        </div>
    )
}

export default PopularFamousPeople
