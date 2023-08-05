import axios from "axios";
import { connect } from 'react-redux';
import { loadMoviesFavories } from "../../actions/movie/movieAction";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './pagefavories.css'
import { userShow } from "../../actions/user/userActions";
import requests from "../../services/api/request";
import { handleStorage } from "../../utils/handleStorage";
import { useApi } from "../../services/AxiosInstance/useApi";
import RateMovie from '../../components/RateMovie/ratemovie';
import FavoriteHeart from '../../components/FavoriteHeart/favoriteheart';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';
import { toast } from "react-toastify";


const Favories = (props) => {
    console.log("🚀 ~ file: PageFavories.js:10 ~ Favories ~ props:", props)
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
    const navigate = useNavigate();
    // const { movies } = props;
    const { user } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState(null);
    const [id, setId] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    // constante qui stocke les differents message à envoyer
    const [displayGuestMessage, setDisplayGuestMessage] = useState(0);

    const api = useApi();

    useEffect(() => {
        async function fetchDataUser() {
            try {


                const user = await handleStorage();
                console.log("🚀 ~ file: PageFavories.js:30 ~ fetchDataUser ~ user:", user)
                setId(user.id)
                if (!user) {
                    // si user pas connecté tu envoies message 1
                    setDisplayGuestMessage(1);
                    // puis le message 2
                    setTimeout(() => {
                        setDisplayGuestMessage(2);
                    }, 5000);
                    // enfin tous les messages disparaissent
                    setTimeout(() => {
                        setDisplayGuestMessage(0);
                    }, 10000);

                } else {
                    // si user connecté
                    fetchMoviesFavories(user.id);
                    setIsAdmin(true)

                }
                //  console.log("🚀 ~ file: PageFavories.js:30 ~ fetchDataUser ~ movies:", movies.data.results)
                //   if(movies.status === 200) {
                //      setTimeout(() => {
                //          setIsLoading(false);
                //      })
                //       setDatas(movies.data.results)
                //    }
            } catch (error) {
                console.log("🚀 ~ file: App.js:59 ~ handleStorage ~ error:", error)
                setError(error)
            }
        }
        fetchDataUser()
    }, [])

    async function fetchMoviesFavories(id) {
        try {
            props.loadMoviesFavories(id)

            // const movies = await api.post(requests.fetchFavoriesMovie + parseInt(id))
            const movies = await api.get(requests.fetchMoviesRecordedFavories)
            console.log("🚀 ~ file: PageFavories.js:69 ~ fetchMoviesFavories ~ movies:", movies)
            console.log("🚀 ~ file: PageFavories.js:70 ~ fetchMoviesFavories ~ movies:", movies.data.results)
            if (movies.status === 200) {
                setTimeout(() => {
                    setIsLoading(false);
                })
                setDatas(movies.data.results)
            }

        } catch (error) {
            console.log("🚀 ~ file: PageFavories.js:81 ~ fetchMoviesFavories ~ error:", error)
            setIsLoading(false);
            setError(error)

        }
    }


    async function HandleDelete(idMovie) {
        console.log("🚀 ~ file: PageFavories.js:100 ~ HandleDelete ~ idMovie:", idMovie)
        console.log('je suis dans le handledelete');

        try {
            const user = await handleStorage();
            console.log("🚀 ~ file: PageFavories.js:30 ~ fetchDataUser ~ user:", user)
            
            if(user) {
            const deleteMovie = await api.delete(requests.deleteMovieListFAvoriesUser + idMovie + '/delete');
            console.log("🚀 ~ file: PageFavories.js:108 ~ HandleDelete ~ deleteMovie:", deleteMovie)
            if(deleteMovie.status === 200) {
                toast.success(deleteMovie.data.message, { type: "success", theme: "colored", autoClose: 5000})

                setTimeout(() => {
                    navigate('/favories')
                }, 3000)
            } else {
                toast.error(deleteMovie.data.message, { type: "error", theme: "colored", autoClose: 5000})
 
            }
            }
        } catch (error) {
        console.log("🚀 ~ file: PageFavories.js:113 ~ HandleDelete ~ error:", error)

        }
    }

    if (isLoading) {
        return <div>Loading favories...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>
        setIsLoading(false);

    }


    console.log("🚀 ~ file: PageFavories.js:99 ~ Favories ~ userData:", datas)


    return (
        <div>
            <>
                <div>
                    {/* si displayGuestMessage vaut 1 affiche moi le contenu de ce message sinon pas */}
                    <div className={`${displayGuestMessage === 1 ? 'displayMessage' : 'transDisplayMessage'}`}><img alt="image_dupont" src={process.env.PUBLIC_URL + '/assets/images/dupond.jpg'} /><p> C'était bien tenté ! Tu dois creer un compte pour enregistrer tes favoris !!😀</p></div>
                    {/* si displayGuestMessage vaut 2 affiche moi le contenu de ce message sinon pas */}
                    <div className={`${displayGuestMessage === 2 ? 'displayMessage' : 'transDisplayMessage'}`}><img alt="image_duppont" src={process.env.PUBLIC_URL + '/assets/images/dupond.jpg'} /><p> Je dirais même plus  ! Tu dois creer un compte pour enregistrer tes favoris !!!😀</p></div>
                </div>

                <h2 className="title_page_favories">Page des favoris</h2>
                <section className='card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4'>
                    {/* {console.log("Les datas des movies : ", data)} */}
                    {datas.map((m, i) => (
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
                            <button onClick={(e) => HandleDelete(m.id)} className="card_button_acceuil_details btn btn-danger ">
                                    Supprimer
                            </button>

                        </div>
                    ))}

                </section>
            </>
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
    loadMoviesFavories, userShow

}

export default connect(mapStateToProps, mapDispatchToProps)(Favories)
