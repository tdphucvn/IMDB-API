import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router';
import GeneralHeader from './GeneralHeader';
import ActorDetails from './ActorDetails';


const SearchPeople = () => {
    const { id } = useParams();
    const [actorDetails, setActorDetails] = useState([]);

    const fetchCertainActor = async (actorId) => {
        const URL = `https://api.themoviedb.org/3/person/${actorId}?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
        const method = { method: 'GET', contentType: 'application/json' };
        return await fetch(URL, method)
            .then((res) => {
                if(res.ok) return res.json();
                return res.text().then((err) => {
                    return Promise.reject({
                        status: res.status,
                        statusText: res.statusText,
                        errorMessage: err,
                    });
                });
            })
            .then((data) => {
                setActorDetails(data);
            }) 
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchMovieCredits = async (actorId) => {
        const URL = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
        const method = { method: 'GET', contentType: 'application/json' };
        return await fetch(URL, method)
            .then((res) => {
                if(res.ok) return res.json();
                return res.text().then((err) => {
                    return Promise.reject({
                        status: res.status,
                        statusText: res.statusText,
                        errorMessage: err,
                    });
                });
            })
            .then((data) => {
                console.log(data);
            }) 
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchCertainActor(id);
        fetchMovieCredits(id);
    }, [id]);

    return (
        <div>
            <GeneralHeader />
            <ActorDetails data={actorDetails}/>
        </div>
    )
}

export default SearchPeople
