import {React, useState, useEffect} from 'react';
import Movies from './Movies';
import SearchBar from './SearchBar';
import Spinner from './Spinner'


const Dashboard = (prevSearch) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [spinner, setSpinner] = useState();

    // const fetchMoviesCallback = (search) => {
    //   if(prevSearch.location.state === undefined || prevSearch.location.state.previousMovies.movies === undefined){
    //     console.log('Undefined')
    //     const fetchData = async () => {
    //       const URL = `http://www.omdbapi.com/?apikey=2b921791&${search}`;
    //       await fetch(URL, {method: 'GET', contentType: 'application/json'})
    //         .then((res) => {
    //           if(res.ok) return res.text();
    //           return res.text().then(err => {
    //             return Promise.reject({
    //               status: res.status,
    //               statusText: res.statusText,
    //               errorMessage: err,
    //             });
    //           });
    //         })
    //         .then((data) => {
    //           const rawData = JSON.parse(data);
    //           console.log(rawData)
    //           setSpinner(true);
    //           setTimeout(() => {setSpinner(false); setMovies(rawData.Search)}, 700);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     };
    //     fetchData()
    //   } else {
    //     setMovies(prevSearch.location.state.previousMovies.movies);
    //     prevSearch.location.state.previousMovies.movies = undefined;
    //   }
    // }

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
            setSpinner(true);
            setTimeout(() => {setSpinner(false); setMovies(rawData.results)}, 700);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      defaultFetchData();
    };

    const searchFetch = async (search) => {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5${search}`;
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
          console.log(rawData)
          setSpinner(true);
          setTimeout(() => {setSpinner(false); setMovies(rawData.results)}, 700);
        })
        .catch((err) => {
          console.log(err);
        });
      };
      searchFetchData();
    };

    useEffect(() => {
      // fetchMoviesCallback(search);
      defaultFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      searchFetch(search);
    }, [search]);


    return (
        <div className="dashboardContainer" style={style}>
            <SearchBar state={[search, setSearch]}/>
            {spinner === true ? <Spinner /> : <Movies movies = {movies}/> }
        </div>
    )
};

const style = {
  display: 'flex',
  maxWidth: '100vw',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#27496d',
  paddingBottom: '20px',
}

export default Dashboard
