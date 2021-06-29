import React from 'react';
import { Typography, Container, FormControl, TextField, makeStyles, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        margin: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // '& .MuiFormLabel-root':{
        //     color: 'white'
        // },
    },
    titleInput: {
        flex: '1',
        marginRight: theme.spacing(2),
        minWidth: 100,
        // '& ::before': {
        //     borderBottom: '1px solid white'
        // },
        // color: 'white',
        // '& .MuiInputBase-root':{
        //     color: 'white',
        // }
    },
    yearInput: {
        marginRight: theme.spacing(2),
        minWidth: 40,
        // '& ::before': {
        //     borderBottom: '1px solid white'
        // },
        // color: 'white',
        // '& .MuiInputBase-root':{
        //     color: 'white',
        // }
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
    }
}));

const SearchBar = ({state}) => {
    const classes = useStyles(); 
    
    const [query, setQuery] = state;

    const handleSearch = (event) => {
        event.preventDefault();
        let queryArray = [];
        const searchParams = new URLSearchParams(new FormData(event.target).entries());
        for(let data of searchParams){
            queryArray.push(data);
        };
        setQuery(queryArray);
    };

    return (  
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h4" align="center" style={{color: 'white'}}gutterBottom={true}>Search for your favourite films!</Typography>
                <Typography variant="subtitle1" align="center" style={{color: 'white'}} gutterBottom={true}>All the films at one place</Typography>
                <FormControl component="form" className={classes.formControl} variant="outlined" onSubmit={handleSearch}>
                    <TextField type="text" name="title" required label="Film Title" noValidate autoComplete="off" className={classes.titleInput}/>
                    <TextField type="number" name="year" label="Released Year" noValidate autoComplete="off" className={classes.yearInput} />
                    <Button startIcon={<SearchIcon />} type="submit" color="secondary">Search</Button>
                </FormControl>
            </Container>
        </>
    )
}

export default SearchBar
