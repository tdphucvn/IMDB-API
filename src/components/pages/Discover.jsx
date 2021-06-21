import { React, useState } from 'react'
import DiscoverHeader from '../utils/DiscoverHeader';
import DiscoverMovies from '../utils/DiscoverMovies';

const Discover = () => {

    const [query, setQuery] = useState([]);
    const [component, setComponent] = useState(0);
    
    return (
        <div style={{paddingBottom: '30px'}}>
            <DiscoverHeader state={[query, setQuery]} moviesComponent={[component, setComponent]}/>
            <DiscoverMovies state={component} searchQuery={query}/>
        </div>
    )
}

export default Discover
