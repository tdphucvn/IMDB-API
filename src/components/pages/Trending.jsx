import {React, useState, useEffect} from 'react';
import Movies from '../utils/Movies';

const Dashboard = (prevSearch) => {
    const [movies, setMovies] = useState([]);
    
    const defaultFetch = async () => {
      const URL = "https://api.themoviedb.org/3/discover/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&sort_by=popularity.desc";
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
            console.log(rawData)
            setMovies(rawData.results)
          })
          .catch((err) => {
            console.log(err);
          });
      };
      defaultFetchData();
    };



    useEffect(() => {
      defaultFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
          <Movies movies={movies}/>
        </>
    )
};

export default Dashboard
