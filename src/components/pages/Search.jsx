import { React, useState, useEffect } from 'react';
import SearchBar from '../utils/SearchBar';
import Movies from '../utils/Movies';
import DiscoverMovies from '../utils/DiscoverMovies';


const Search = () => {
    const [query, setQuery] = useState([]);
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const searchFetch = async (search) => {
        console.log('search')
        const paramsQuery = '&query=' + search[0][1] + '&year=' + search[1][1];
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5${paramsQuery}`;
        const searchFetchData = async () => {
          await fetch(URL , {method: 'GET', contentType: 'application/json'})
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
            setMovies(rawData.results)
          })
          .catch((err) => {
            console.log(err);
          });
        };
        searchFetchData();
    };

    const trendingFetch = async () => {
        const URL = "https://api.themoviedb.org/3/trending/all/week?api_key=ef7ddaa9270377970a055a19e5bfc2e5";
        const trendingFetchData = async () => {
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
                setTrendingMovies(rawData.results)
              })
              .catch((err) => {
                console.log(err);
              });
        };
        trendingFetchData();
    }

    useEffect(() => {
        if(query.length < 1) { trendingFetch(); return };
        searchFetch(query);
    }, [query]);
    
    return (
        <>
            <SearchBar state={[query, setQuery]}/>
            {movies.length > 0 ? <Movies movies={movies}/> : <DiscoverMovies movies={trendingMovies}/>}
        </>
    )
}

export default Search
