export const api_url = process.env.REACT_APP_API_URL

const requests = {

    fetchAllMoviesDatabase: `${api_url}/api/movies/list`,
    fetchAllCategories: `${api_url}/api/categories/list`,
    fetchMoviesByAuthor: `${api_url}/api/authors/`,
    fetchMoviesByCategory: `${api_url}/api/categories/`,
    fetchAllAuthorsByNameArtist: `${api_url}/api/authors/list/artist`,
    fetchAllCharacters: `${api_url}/api/characters/list`,
    fetchCharacterById: `${api_url}/api/characters/`,
    fetchAllAutors: `${api_url}/api/authors/list`,
    fetchFavoriesMovie: `${api_url}/api/movies/favorite/list/`,
    fetchMovieBySlug: `${api_url}/api/movies/list/`,
    fetchMovieById: `${api_url}/api/movies/`,
    fetchMovieBySearch: `${api_url}/api/movies/research/`,
    fetchMovieRandom: `${api_url}/api/movies/random`,
    fetchUser: `${api_url}/api/user/verify`,
    fetchUploadPicture: `${api_url}/api/movies/upload/picture`,
    postUploadPictureCharacter: `${api_url}/api/characters/upload/picture`,
    postMovieDatabase: `${api_url}/api/movies/add`,
    postRateMovie: `${api_url}/api/movies/rate`,
    postCharacterDatabase: `${api_url}/api/characters/add`,
    postMovieFavories: `${api_url}/api/movies/favorite/add/`,
    postComment: `${api_url}/api/comments/create/`,
    putMovieDatabase: `${api_url}/api/movies/edit/`,
    putCharacterDatabase: `${api_url}/api/characters/edit/`,
    deleteMovieDatabase: `${api_url}/api/movies/delete/`,
    deleteCharacterDatabase: `${api_url}/api/characters/delete/`,
    deleteMovieListFAvoriesUser: `${api_url}/api/movies/favorite/`,
    fetchImageFolderPublicBack: `${api_url}/api/movies/images/`,
    fetchUserConnected: `${api_url}/api/user/show`,
    login: `${api_url}/api/login_check`,
    register: `${api_url}/api/register`,
    fetchPictures: `${api_url}/api/movies/pictures`,
    refreshToken: `${api_url}/token/refresh`,
    fetchCommentsToUser: `${api_url}/api/comments/list/`,
    fetchMoviesRecordedFavories: `${api_url}/api/movies/favorite/list`

}

export default requests;