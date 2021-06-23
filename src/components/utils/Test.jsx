import React, { useState, useEffect }  from 'react';


const Test = () => {

    const [people, setPeople] = useState([]);

    const fetchPeople = async () => {
        const URL = 'https://api.themoviedb.org/3/movie/520763/similar?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US&page=1';
        const method = { method: 'GET', contentType: 'application/json' };
        return await fetch(URL, method).then((res) => {
            return res.json();
        })
            .then(data => {
                const {results} = data;
                console.log(data);
                setPeople(results);
            })
            .catch(err => console.log(err));
    }; 

    useEffect(() => {
        fetchPeople();
    }, []);

    console.log(people);

    return (
        <div style={{color: 'white'}}>
            {people && people.map((person) => (
                person.name
            ))}
        </div>
    )
}

export default Test
