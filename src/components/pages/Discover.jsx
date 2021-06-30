import { React, useState } from 'react'
import DiscoverHeader from '../utils/discover/DiscoverHeader';
import DiscoverMovies from '../utils/discover/DiscoverMovies';

const Discover = () => {

    const [query, setQuery] = useState([]);
    const [component, setComponent] = useState(0);
    
    return (
        <div style={{padding: '50px 0'}}>
            <DiscoverHeader state={[query, setQuery]} moviesComponent={[component, setComponent]}/>
            <DiscoverMovies state={component} searchQuery={query}/>
        </div>
    )
}

export default Discover
