import React from 'react';
import { useSelector } from 'react-redux';

const Test = () => {
    const genres = useSelector((state) => state)

    console.log(genres)

    return (
        <div style={{color: 'white'}}>
            Hello
        </div>
    )
}

export default Test
