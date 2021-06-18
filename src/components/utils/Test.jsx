import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres } from '../../redux/GenresSlice';

const Test = () => {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genre)
    console.log(genres)


    return (
        <div style={{color: 'white'}}>
            Hello
        </div>
    )
}

export default Test
