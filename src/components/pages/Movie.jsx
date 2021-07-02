import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import SingleHeader from '../utils/header/SingleHeader';
import MovieCast from '../utils/movie/MovieCast';
import MovieOverview from '../utils/movie/MovieOverview';

    
const getCrewMembers = (data) => {
    if(data === undefined  || data.length === 0) return [];
    const {crew: rawArrCrew} = data;
    const crewMembers = rawArrCrew.filter((member) => (
        member.job === "Characters" || member.job === "Producer" || member.job === "Director"
    ));
    return crewMembers;
};

const getCastMembers = (data) => {
    if(data === undefined  || data.length === 0) return [];
    const {cast: rawArrCast} = data;
    if(rawArrCast.length > 20) return rawArrCast.slice(0,20);
    return rawArrCast;
}

const fetchData = async (URL, setter) => {
    const method = {
        method: 'GET', 
        contentType: 'application/json',
    };
    await fetch(URL, method)
    .then((res) => {
        if (res.ok) return res.text();
        return res.text().then(err => {
            return Promise.reject({
                status: res.status,
                statusText: res.statusText,
                errorMessage: err,
            });
        });
    })
    .then((data) => {
        setter(JSON.parse(data));
    })
    .catch((err) => {
        console.log(err);
    });
};

const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);
    const [movieCredit, setMovieCredit] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const {id} = useParams();

    const URL_DATA = `https://api.themoviedb.org/3/movie/${id}?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
    const URL_VIDEOS = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
    const URL_CREDIT = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
    const URL_RECOMMENTATION = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&page=1`;

    useEffect(() => {
        fetchData(URL_DATA, setMovie);
        fetchData(URL_VIDEOS, setMovieTrailer);
        fetchData(URL_CREDIT, setMovieCredit);
        fetchData(URL_RECOMMENTATION, setRecommendedMovies);        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <>
            <SingleHeader />
            <MovieOverview movieData={movie} trailer={movieTrailer.results} crewMembers={getCrewMembers(movieCredit)}/>
            <MovieCast cast={getCastMembers(movieCredit)} movieData={movie} recommendation={recommendedMovies}/>
        </>
    )
}

export default Movie
