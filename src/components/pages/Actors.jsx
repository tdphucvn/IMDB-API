import React, { useState, useEffect } from 'react';
import PopularFamousPeople from '../utils/actor/PopularFamousPeople';

const Actors = () => {
    const [actors, setActors] = useState([]);
    const [actorsDetails, setActorsDetails] = useState([]);
    const [searchActor, setSearchActor] = useState('');

    const fetchActors = async () => {
        const URL = 'https://api.themoviedb.org/3/person/popular?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&page=1';
        const method = { method: 'GET', contentType: 'application/json' };
        return await fetch(URL, method)
            .then((res) => {
                if(res.ok) return res.json();
                return res.text().then(err => {
                    return Promise.reject({
                      status: res.status,
                      statusText: res.statusText,
                      errorMessage: err,
                    });
                });
            })
            .then((data) => {
                const { results } = data;
                setActors(results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchActors();
    }, []);

    useEffect(() => {
        if(actors === undefined || actors.length < 0) return;
        const getActorDetails = async (actor) => {
            const URL = `https://api.themoviedb.org/3/person/${actor.id}?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US`;
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
                .then(data => {
                    const sumUpActor = {...actor, ...data}
                    setActorsDetails(arr => [...arr, sumUpActor]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    
        for(let actor in actors) {
            getActorDetails(actors[actor]);
        };
    }, [actors]);

    useEffect(() => {
        if(searchActor === '') return;
        const searchActorFetch = async () => {
            const URL = `https://api.themoviedb.org/3/search/person?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&query=${searchActor}&page=1&include_adult=false`;
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
                .then(data => {
                    setActorsDetails([]);
                    console.log(data.results)
                    setActors(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        searchActorFetch();
    }, [searchActor])

    return (
        <div style={{backgroundColor: '#F9F9F9', padding: '50px 0'}} id="actors">
            <PopularFamousPeople actors={actorsDetails} searchActor={[searchActor, setSearchActor]} /> 
        </div>
    )
}

export default Actors
