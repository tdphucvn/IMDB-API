import {React, useState, useEffect} from 'react';
import Movies from './Movies';
import SearchBar from './SearchBar';


const Dashboard = (prevSearch) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState([]);

    const fetchMoviesCallback = (search) => {
      if(prevSearch.location.state.previousMovies.movies === undefined){
        console.log('Undefined')
        const fetchData = async () => {
          const URL = `http://www.omdbapi.com/?apikey=2b921791&${search}`;
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
              setMovies(rawData.Search);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        fetchData()
      } else {
        setMovies(prevSearch.location.state.previousMovies.movies);
        prevSearch.location.state.previousMovies.movies = undefined;
      }
    }

    useEffect(() => {
      fetchMoviesCallback(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div style={style}>
            <SearchBar state={[search, setSearch]}/>
            <Movies movies={movies}/>
        </div>
    )
};

const style = {
  display: 'flex',
  width: '100vw',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
}

export default Dashboard
