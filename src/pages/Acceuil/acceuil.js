import React, { useEffect, useState } from 'react';
import './acceuil.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/movie/movieAction';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';
import { handleStorage } from '../../utils/handleStorage';
import axios from 'axios';
import requests, { api_url } from '../../services/api/request';
import RateMovie from '../../components/RateMovie/ratemovie';
import FavoriteHeart from '../../components/FavoriteHeart/favoriteheart';
import { userShow } from '../../actions/user/userActions';
import { useApi } from '../../services/AxiosInstance/useApi';

const Acceuil = (props) => {
console.log("🚀 ~ file: acceuil.js:17 ~ Acceuil ~ props:", props)

    const api = useApi();
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)

    const { movies } = props;
    const [movie, setMovie] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);





    useEffect(() => {
        async function fetchDataUser() {
            try {
                const user = await handleStorage();
                console.log("🚀 ~ file: acceuil.js:39 ~ fetchDataUser ~ user:", user)
                // console.log("🚀 ~ file: acceuil.js:40 ~ fetchDataUser ~ user:", user.email)
                const roles = user.roles;
                for (const role of roles) {
                    if (role === "ROLE_ADMIN") {
                        console.log(role);
                        setIsAdmin(!isAdmin)
                    }
                }

                if (!user) {
                    return fetchDatabaseNotUser();
                } else if (user.roles === 'admin') {
                    // si utilisateur admin renvoie true et lance la fonction fetchDatabase
                    setAdmin(!admin)
                   return fetchDatabaseUser();
                } else {
                    // sinon admin false lance la fonction fetchDatabase également
                    setAdmin(false)
                    return fetchDatabaseUser();
                }

            } catch (error) {
                console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)
            }
        }

        fetchDataUser()

    }, [])

    // içi fonction qui renvoie les film de tintin avec l'indication de ses films en favoris en envoyant dans la fonction son token 
    async function fetchDatabaseUser() {
        try {
            props.loadMovies()
           // console.log("🚀 ~ file: acceuil.js:75 ~ fetchDatabaseUser ~ moviesRedux:", moviesRedux)
            
            const request = await api.get(requests.fetchAllMoviesDatabase);

            console.log("🚀 ~ file: acceuil.js:82 ~ fetchDatabaseUser ~ request:", request)
            if(request.status === 200) {
                setIsLoading(false);
                setError(null);
                setMovie(request.data.results)
            } 
    
        } catch (error) {
            setIsLoading(false);
            setError(error)

        }

    }



    // içi fonction qui renvoie les film de tintin pour les utilisateurs non inscrits ou pas connécté
    async function fetchDatabaseNotUser() {
        try {
            props.loadMovies()
            console.log('pas de utilisateur !');
            const request = await axios.get(requests.fetchAllTintinDatabaseNotUser)
            console.log("🚀 ~ file: acceuil.js:100 ~ fetchDatabaseNotUser ~ request:", request)
            if(request.status === 200) {
                setIsLoading(false);
                setError(null);
                setMovie(request.data.results)
            } 

        } catch (error) {
            setIsLoading(false);
            setError(error)

        }

    }






    axios.get(requests.fetchImageFolderPublicBack + '64baf1401072c.jpg')
        .then((response) => {
            console.log("🚀 ~ file: acceuil.js:37 ~ .then ~ response:", response)

            if (!response.ok) {
                console.log('Image not found')
            }
            return response.blob();
        })
        .then((blob) => {
            setImageUrl(URL.createObjectURL(blob));
        })
        .catch((err) => console.log(err))

    console.log("🚀 ~ file: acceuil.js:30 ~ Acceuil ~ isAdmin:", isAdmin)



     if (isLoading) {
         return <div>Loading movies...</div>
     }

     if (error) {
         return <div>Error : {error.message}</div>

     }
    console.log("🚀 ~ file: acceuil.js:61 ~ Acceuil ~ movie:", movie)

    return (
        <div>
            <h2 className="title_page_acceuil">Page Acceuil</h2>

            <section className={`${themeApp ? 'card_movies_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4' : 'card_movie_dark d-flex flex-row flex-wrap justify-content-center p-4 pt-4'}`}>

                {isAdmin ? <Link to={`/addmovie`}>
                    <button className=" btn btn-primary ">
                        Ajouter un film
                    </button>

                </Link> : null}
                <br></br>
                {console.log("Les datas des movies : ", movies.movies)}
                {/* {console.log("Les syno des movies : ", props.movies.movies[0].synopsis)}; */}
                {/* {data.lenght > 0 && <ul> */}
                {movie.map((m, i) => (
                    // <Movie movie={m} />
                    <div className='card_movie_container' key={i}>
                        <FavoriteHeart
                            movie={m}
                        />
                        <div className="star">
                            <RateMovie
                                movieRate={m.rating}
                                movieId={m.id}
                            />
                        </div>


                        <div className="image ">
                            <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                        </div>


                        <p>{m.synopsis.substring(0, 489)}...</p>
                        <Link to={`/movie/${m.id}`}>
                            <button className="card_button_acceuil_details btn btn-primary ">
                                Détails
                            </button>

                        </Link>
                    </div>
                ))}
                {/* </ul>} */}
                <img src={`${api_url}/api/movies/images/64baf1401072c.jpg`} />

            </section>
        </div>
    )
}


const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        characters: store.characters,
        auth: store.auth,
        user: store.user,
        authors: store.authors

    }
}

const mapDispatchToProps = {
    loadMovies, userShow
}

export default connect(mapStateToProps, mapDispatchToProps)(Acceuil)

