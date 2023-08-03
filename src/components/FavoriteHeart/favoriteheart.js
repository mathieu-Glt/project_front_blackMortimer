import FavoriteIconEmpty from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import requests from '../../services/api/request';
import axios from 'axios';
import { useState } from 'react';
import { useApi } from '../../services/AxiosInstance/useApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function FavoriteHeart(props) {

    const navigate = useNavigate();
    console.log("🚀 ~ file: favoriteheart.js:10 ~ FavoriteHeart ~ props:", props)
    console.log("🚀 ~ file: favoriteheart.js:10 ~ FavoriteHeart ~ props:", props.movie.title)
    console.log("🚀 ~ file: favoriteheart.js:8 ~ FavoriteHeart ~ props:", props.movie.id)
    const api = useApi();
    const [token, setToken] = useState();
    const [movieTitle, setMovieTitle] = useState('');
    const Component = props.movie.favorite ? FavoriteIconFilled : FavoriteIconEmpty;

    function handleClickFavorite(movieId, movieTitle) {
        console.log("🚀 ~ file: favoriteheart.js:19 ~ handleClickFavorite ~ movieTitle:", movieTitle)
        console.log('handleClickFavorite');
        console.log("🚀 ~ file: favoriteheart.js:15 ~ handleClickFavorite ~ movieId:", movieId)
        const token = localStorage.getItem("access_token");
        console.log("🚀 ~ file: favoriteheart.js:14 ~ handleClickFavorite ~ token:", token)
        setToken(token);
        const user = localStorage.getItem("user");
        console.log("🚀 ~ file: favoriteheart.js:16 ~ handleClickFavorite ~ user:", user)
        const userParse = JSON.parse(user)
        console.log("🚀 ~ file: favoriteheart.js:18 ~ handleClickFavorite ~ userParse:", userParse)
        
        if (token) {
            postFavoriteMovie(movieId, movieTitle)
        } else {
            console.log('User must be connected !');
        }
    


    }



    async function postFavoriteMovie(id, title) {
        console.log("🚀 ~ file: favoriteheart.js:43 ~ postFavoriteMovie ~ movieTitle:", title)
        console.log("🚀 ~ file: favoriteheart.js:33 ~ postFavoriteMovie ~ movieId:", id)
        const movie = {
            id,
            title
        }
        console.log("🚀 ~ file: favoriteheart.js:38 ~ postFavoriteMovie ~ movie:", movie)

        // todo requete axios pour envoyer film en favoris
        
         const postMovie = await api.post(requests.postMovieFavories, movie)
         .then((postMovie) => {
            if(postMovie.status === 200) {
                    toast.success(postMovie.data.message, { type: "success", theme: "colored", autoClose: 5000})
                    setTimeout(() => {

                        navigate('/favories')
                    }, 5000)
            }
         })
         .catch(error => {
            setTimeout(() => {
                toast.error(postMovie.data.message, { type: "error", theme: "colored", autoClose: 5000})
            }, 3000)

         })
         console.log("🚀 ~ file: favoriteheart.js:49 ~ postFavoriteMovie ~ postMovie:", postMovie)


        
    }



    return (
        <a onClick={(e) => handleClickFavorite(props.movie.id, props.movie.title)} className="link-favourite" href='#'>
            <Component style={{ color: "red", width: "40px", height: "40px" }} />
        </a>

    )
    
};

export default FavoriteHeart;