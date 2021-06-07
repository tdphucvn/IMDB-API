import React from 'react';
import '../css/dashboard.css';


const SearchBar = ({state}) => {

    const [search, setSearch] = state;

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const query = `${data.search !== '' ? '&query=' + data.search : '' }`
        e.target.reset();
        setSearch(query);
    }

    return (  
        <div className="search-container">
            <form id="searchBar" onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="input-wrapper">
                        <input type="text" name="search" autoComplete="off" placeholder="Search..."/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
