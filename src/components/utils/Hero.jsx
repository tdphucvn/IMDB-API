import {React, useState, useEffect} from 'react'

const Hero = () => {
    const [poster, setPoster] = useState([]);
    const fetchPoster = async () => {
        const URL = "https://api.themoviedb.org/3/search/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5&query=Aquaman";
        const defaultFetchPoster = async () => {
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
                setPoster(rawData.results)
            })
            .catch((err) => {
                console.log(err);
            });
        };
        defaultFetchPoster();
    };
    

    useEffect(() => {
        fetchPoster();
    }, []);


    const IMG_API = 'https://image.tmdb.org/t/p/original/';

    return (
        <div style={{width: '100vw'}}>
            <img src={poster[0] !== undefined ? IMG_API + poster[0].backdrop_path : ''} alt="poster" style={{width: '100%'}} />
        </div>
    )
}

export default Hero
