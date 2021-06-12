import React from 'react'

const Search = () => {

    // const searchFetch = async (search) => {
    //     const URL = `https://api.themoviedb.org/3/search/movie?api_key=ef7ddaa9270377970a055a19e5bfc2e5${search}`;
    //     const searchFetchData = async () => {
    //       await fetch(URL , {method: 'GET', contentType: 'application/json'})
    //       .then((res) => {
    //         if(res.ok) return res.text();
    //         return res.text().then(err => {
    //           return Promise.reject({
    //             status: res.status,
    //             statusText: res.statusText,
    //             errorMessage: err,
    //           });
    //         });
    //       })
    //       .then((data) => {
    //         const rawData = JSON.parse(data);
    //         setSpinner(true);
    //         setTimeout(() => {setSpinner(false); setMovies(rawData.results)}, 700);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     };
    //     searchFetchData();
    //   };

    // useEffect(() => {
    //     searchFetch(search);
    //   }, [search]);
  

    return (
        <div>
            Tohle je search
        </div>
    )
}

export default Search
