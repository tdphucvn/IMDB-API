import React from 'react';
import '../css/dashboard.css';


const SearchBar = ({state}) => {

    const [search, setSearch] = state;

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const query = `${data.search !== '' ? 's=' + data.search : '' }${data.type === undefined ? '' : '&type=' + data.type}${data.year !== '' ? '&y=' + data.year : ''}`
        e.target.reset();
        setSearch(query);
    }

    return (  
        <div className="dashboard-container">
            <form id="searchBar" onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="input-wrapper">
                        <label htmlFor="search">Title</label>
                        <input type="text" name="search" autoComplete="off" placeholder="Title..."/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="year">Released Year</label>
                        <input type="number" name="year" min="1900" autoComplete="off" placeholder="Realesed Year..."/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type">
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                    </div>

                </div>
                <div className="form-row">
                    <input type="submit" value="Search"/>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
