export const api_url = process.env.REACT_APP_API_URL


const requests = {
    fetchAllTintinDatabaseNotUser: `${api_url}/api/movies/list`,
    fetchAllCharacters: `${api_url}/api/characters/list`,
    fetchAllAutors: `${api_url}/api/authors/list`,
    fetchFavoriesMovie: `${api_url}/api/favorite/list`,
    fetchMovieBySlug: `${api_url}/api/movies/list/`,
    fetchMovieById: `${api_url}/api/movies/`,
    fetchMovieBySearch: `${api_url}/api/movies/research/`,
    fetchMovieRandom: `${api_url}/api/movies/random`,
    login: `${api_url}/api/login_check`,
    register: `${api_url}/api/register`
}

export default requests;