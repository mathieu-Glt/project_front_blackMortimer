import axios from "axios";
import { connect } from 'react-redux';
import { loadMoviesFavories } from "../../actions/movie/movieAction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './pagefavories.css'
import { userShow } from "../../actions/user/userActions";
import requests from "../../services/api/request";
import { handleStorage } from "../../utils/handleStorage";
import { useApi } from "../../services/AxiosInstance/useApi";
import RateMovie from '../../components/RateMovie/ratemovie';
import FavoriteHeart from '../../components/FavoriteHeart/favoriteheart';

const Favories = (props) => {
    console.log("🚀 ~ file: PageFavories.js:10 ~ Favories ~ props:", props)
    // const { movies } = props;
    const { user } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState(null);
    const api = useApi();
    
    useEffect(() => {
        async function fetchDataUser() {
            try {
                const user = await handleStorage();
                console.log("🚀 ~ file: App.js:57 ~ handleStorage ~ user:", user.id)
                
                    const movies = await api.post(requests.fetchFavoriesMovie + parseInt(user.id))
                    console.log("🚀 ~ file: PageFavories.js:29 ~ fetchDataUser ~ movies:", movies.status)
                    console.log("🚀 ~ file: PageFavories.js:30 ~ fetchDataUser ~ movies:", movies.data.results)
                    if(movies.status === 200) {
                        setTimeout(() => {
                            setIsLoading(false);
                        })
                        setDatas(movies.data.results)
                    }
            } catch (error) {
                console.log("🚀 ~ file: App.js:59 ~ handleStorage ~ error:", error)
                setError(error)
                
            }
        }
        
        fetchDataUser()
    }, [])
    
    
    
    if (isLoading) {
        return <div>Loading favories...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>
        setIsLoading(false);
        
    }
    
    
    console.log("🚀 ~ file: PageFavories.js:19 ~ Favories ~ userData:", datas)


    return (
        <div>
            <>
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
