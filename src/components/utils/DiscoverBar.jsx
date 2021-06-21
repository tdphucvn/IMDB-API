import React, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Button, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3), 
    },
    select: {
        minWidth: 150,
        '& .MuiInput-underline::before': {
            borderBottom: '1px solid white'
        }
    },
}));
const getYearsArray = (ar) => {
    const date = new Date();
    let currentYear = date.getFullYear();
    let index = 0;
    while (index < 5) {
        ar.push(currentYear);
        --currentYear;
        ++index;
    };
    return ar;
}

const DiscoverBar = ({state, genresProps, accordion}) => {
    const classes = useStyles();
    
    const [sort, setSort] = useState('');
    const [year, setYear] = useState('');
    const [query, setQuery] = state;
    const [genres, setGenres] = genresProps;

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleGenreChange = (event) => {
        const id = event.target.value;
        const checkID = (genre) => {
            // eslint-disable-next-line eqeqeq
            if (genre.id == id) return genre
        };
        const foundGenre = genres.find(checkID);
        foundGenre.state ? foundGenre.state = false : foundGenre.state = true;
        setGenres(genres.map((genreMap) => genreMap.id === foundGenre.id ? foundGenre : genreMap));
    };

    const yearsArray = getYearsArray([]);

    const sendQuery = () => {
        if(!accordion) {setQuery([]); return};
        const genre = genres.filter((genreEach) => (genreEach.state))
        setQuery([year, sort, genre]);
    };

    return (
        <React.Fragment>
            <FormGroup row>
                    <FormControl component="form" className={classes.formControl}>
                        <InputLabel style={{color: 'white'}}>Sorted By:</InputLabel>
                        <Select name="sort" value={sort} onChange={handleSortChange} className={classes.select} style={{color: 'white'}}>
                            <MenuItem value={"sort_by=populatiry.desc"}>Popularity</MenuItem>
                            <MenuItem value={"sort_by=revenue.desc"}>Revenue</MenuItem>
                            <MenuItem value={"sort_by=vote_average.desc"}>Vote Average</MenuItem>
                            <MenuItem value={"sort_by=release_date.desc"}>Release Date</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl component="form" className={classes.formControl}>
                        <InputLabel style={{color: 'white'}}>Released Year</InputLabel>
                        <Select name="release-year" value={year} onChange={handleYearChange} className={classes.select}  style={{color: 'white', borderColor: 'white'}}>
                            {yearsArray.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup row>
                    {genres.map((genre) => (
                        <FormControl key={genre.id}>
                            <FormControlLabel control={<Checkbox checked={genre.state} value={genre.id} onChange={handleGenreChange} style={{color: 'white'}}/>} label={genre.name}/>
                        </FormControl>
                    ))}
                </FormGroup>
                <Button onClick={sendQuery} variant="outlined" color="secondary" className={classes.button}>Discover</Button>
        </React.Fragment>
    )
}

export default DiscoverBar
