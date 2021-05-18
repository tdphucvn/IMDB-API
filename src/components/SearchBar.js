import React from 'react'

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
        <div>
            <form id="searchBar" onSubmit={onSubmit}>
                <input type="text" name="search" autoComplete="off"/>
                <select name="type" id="type">
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
                <input type="number" name="year" min="1900" autoComplete="off"/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}

export default SearchBar
