import { React, useState, useEffect } from 'react'
import DiscoverHeader from '../utils/DiscoverHeader';
import DiscoverMovies from '../utils/DiscoverMovies';

const Discover = () => {

    const [query, setQuery] = useState([]);
    const [movies, setMovies] = useState([]);
    const [component, setComponent] = useState(0);
    
    const defaultFetch = async (queryArray) => {
        const queryGenresRaw = queryArray[2] !== undefined && queryArray[2].length !== 0 ? queryArray[2].map((genre) => {return genre.id + '%2C'}) : '';
        const queryGenres = queryGenresRaw.toString().replace(',', '');
        const queryString = (queryArray[1] !== undefined && queryArray[1].length !== '' ? queryArray[1] + '&' : '') + (queryArray[0] !== undefined && queryArray[0].length !== '' ? 'year=' + queryArray[0] + '&' : '') + 'with_genres=' + queryGenres;
        const URL = `https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&include_adult=false&include_video=false&page=1&vote_average.gte=5&${queryString}`;        
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
              setMovies(rawData.results)
            })
            .catch((err) => {
              console.log(err);
            });
        };
        defaultFetchData();
    };

  
    useEffect(() => {
        if(query.length < 1) return;
        defaultFetch(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    console.log(movies, query)

    return (
        <>
            <DiscoverHeader state={[query, setQuery]} moviesComponent={[component, setComponent]} />
            <DiscoverMovies state={component} searchedMovies={movies}/>
        </>
    )
}

export default Discover
