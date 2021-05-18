import {React, useState, useEffect} from 'react';
import Movies from './Movies';
import SearchBar from './SearchBar';


const Dashboard = ({previousMovies}) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState([]);

    if(previousMovies !== undefined) setMovies(previousMovies);
    
    useEffect(() => {
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
            console.log(rawData)
            setMovies(rawData.Search);
          })
          .catch((err) => {
            console.log(err);
          });
      };
  
      fetchData()
    }, [search]);

    return (
        <div>
            <SearchBar state={[search, setSearch]}/>
            <Movies movies={movies}/>
        </div>
    )
};

export default Dashboard
