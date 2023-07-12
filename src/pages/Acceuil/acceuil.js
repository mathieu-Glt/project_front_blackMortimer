import React, { useEffect, useState } from 'react';
import './acceuil.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/movie/movieAction';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';


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


    useEffect(() => {
        try {
            props.loadMovies();
            setMovie(movies);
            setTimeout(()=> {

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
                {console.log("Les datas des movies : ", movies.movies)}
                {/* {console.log("Les syno des movies : ", props.movies.movies[0].synopsis)}; */}
                {/* {data.lenght > 0 && <ul> */}
                {movies.movies.map((m, i) => (
                    // <Movie movie={m} />
                    <div className='card_movie_container' key={i}>


                        <div className="image ">
                            <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                        </div>


                        <p>{m.synopsis.substring(0,489)}...</p>
                        <Link to={`/movie/${m.id}`}>
                            <button className="card_button_acceuil_details btn btn-primary ">
                               Plus
                            </button>

                        </Link>
                    </div>
                ))}
                {/* </ul>} */}
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
    loadMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(Acceuil)

