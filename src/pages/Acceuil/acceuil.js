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


const Acceuil = (props) => {

    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
    console.log("🚀 ~ file: acceuil.js:9 ~ Acceuil ~ props:", props)
    console.log("Les props de acceuil : ", props.movies.movies);
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)

    // const data = props.movies.movies;
    const { movies } = props;
    const [movie, setMovie] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState('');
    
    

    
    
    useEffect(() => {
        async function fetchDataUser() {
            try {
                const user = await handleStorage();
                // console.log("🚀 ~ file: acceuil.js:39 ~ fetchDataUser ~ user:", user)
                // console.log("🚀 ~ file: acceuil.js:40 ~ fetchDataUser ~ user:", user.email)
                const roles = user.roles;
                for (const role of roles) {
                    if(role === "ROLE_ADMIN") {
                        console.log(role);
                        setIsAdmin(!isAdmin)
                    }
                }
                const userStorage = localStorage.getItem('user');
                console.log("🚀 ~ file: acceuil.js:36 ~ Acceuil ~ userStorage:", userStorage);
                const userParse = JSON.parse(userStorage);
                console.log("🚀 ~ file: acceuil.js:38 ~ Acceuil ~ user:", userParse);
            
                setUserData(userParse.email);
                fetchUser(userData)
                
            } catch (error) {
                console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)
                
            }
        }
        
        fetchDataUser()
        
    }, [movies])
    
    console.log("🚀 ~ file: acceuil.js:61 ~ Acceuil ~ user:", userData)
    
function fetchUser(userData) {
    props.userShow(userData);
}        
        
    
    axios.get(requests.fetchImageFolderPublicBack + '64baf1401072c.jpg')
    .then((response) => {
        console.log("🚀 ~ file: acceuil.js:37 ~ .then ~ response:", response)
        
        if(!response.ok) {
            console.log('Image not found')
        }
        return response.blob();
    })
    .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
    })
    .catch((err)=>console.log(err))
    
    console.log("🚀 ~ file: acceuil.js:30 ~ Acceuil ~ isAdmin:", isAdmin)   
    
    
    useEffect(() => {
        try {
            props.loadMovies();
            setMovie(movies);
            setTimeout(() => {

                setIsLoading(false);
            }, 2000)

        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [])

    if (isLoading) {
        return <div>Loading movies...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>

    }

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
                {movies.movies.map((m, i) => (
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
                <img src={`${api_url}/api/movies/images/64baf1401072c.jpg`}/>

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

