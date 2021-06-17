import { React, useState, useEffect } from 'react';
import { Container, FormControl, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 150,
    },
    container: {
        marginBottom: theme.spacing(2),
    },
    formControl: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3), 
    }
}));

const DiscoverBar = ({state}) => {
    const classes = useStyles();
    const [sort, setSort] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenre] = useState([]);
    const [query, setQuery] = state;

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
        setGenre(genres.map((genreMap) => genreMap.id === foundGenre.id ? foundGenre : genreMap));
        console.log(genres);
    };

    let yearsArray = [];

    const getYearsArray = (ar) => {
        const date = new Date();
        let currentYear = date.getFullYear();
        let index = 0;
        while (index < 5) {
            ar.push(currentYear);
            --currentYear;
            ++index;
        };
    }

    getYearsArray(yearsArray);

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
                        console.log(dataEdit);
                        setGenre(dataEdit);
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

    const sendQuery = () => {
        const genre = genres.filter((genreEach) => (genreEach.state))
        console.log([year, sort, genre])
        setQuery([year, sort, genre]);
    };

    return (
        <>
            <Container maxWidth="lg" className={classes.container} id="discover-container">
                <FormGroup row>
                    <FormControl component="form" className={classes.formControl}>
                        <InputLabel>Sorted By:</InputLabel>
                        <Select name="sort" value={sort} onChange={handleSortChange} className={classes.select}>
                            <MenuItem value={"sort_by=populatiry.desc"}>Popularity</MenuItem>
                            <MenuItem value={"sort_by=revenue.desc"}>Revenue</MenuItem>
                            <MenuItem value={"sort_by=vote_average.desc"}>Vote Average</MenuItem>
                            <MenuItem value={"sort_by=release_date.desc"}>Release Date</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl component="form" className={classes.formControl}>
                        <InputLabel>Released Year</InputLabel>
                        <Select name="release-year" value={year} onChange={handleYearChange} className={classes.select}>
                            {yearsArray.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup row>
                    {genres.map((genre) => (
                        <FormControl key={genre.id}>
                            <FormControlLabel control={<Checkbox checked={genre.state} value={genre.id} onChange={handleGenreChange}/>} label={genre.name}/>
                        </FormControl>
                    ))}
                </FormGroup>
                <Button onClick={sendQuery} variant="outlined" color="primary" className={classes.button}>Discover</Button>
            </Container>
        </>
    )
}

export default DiscoverBar
