export const getFetchGenre = async () => {
    const URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ef7ddaa9270377970a055a19e5bfc2e5&language=en-US";
    return await fetch(URL, {method: 'GET', contentType: 'application/json'})
        .then((res) => {
            if (res.ok) return res.json();
            return res.text().then(err => {
                return Promise.reject({
                    status: res.status,
                    statusText: res.statusText,
                    errorMessage: err,
                });
            });
        })
        .then(res => {
            return res.genres;
        });
};

