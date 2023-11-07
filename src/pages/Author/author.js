import React, { useEffect, useState } from 'react';
import './author.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/movie/movieAction';
import { loadCharacters } from '../../actions/character/characterActions';
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext';
import { loadAuthors } from '../../actions/auteur/auteurActions';


const Author = (props) => {

    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)

    console.log("Les props des auteurs : ", props);
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)

    // const data = props.movies.movies;
    const { authors } = props;
    const { auteurs } = props;
    const [author, setAuthor] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        try {
            props.loadAuthors();
            setAuthor(authors);
            setTimeout(()=> {

                setIsLoading(false);
            }, 2000)

        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [])

    if (isLoading) {
        return <div>Loading authors...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>
        // setIsLoading(false);

    }
console.log('voici les props des auteurs : ', authors);
{/* <section className={`${themeApp ? 'card_author_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4' : 'card_author_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4'}`}> */}

    return (
        <div>
            <h2 className='title_page_author'>Tous les auteurs</h2>
            <section className={`${themeApp ? 'card_author_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4' : 'card_author_dark d-flex flex-row flex-wrap justify-content-center p-4 pt-4'}`}>
                {console.log("Les datas des movies : ", authors.authors)}
                {/* {console.log("Les syno des movies : ", props.movies.movies[0].synopsis)}; */}
                {/* {data.lenght > 0 && <ul> */}
                {auteurs.authors.map((a, i) => (
                    // <Movie movie={m} />
                    <div className='card_author_container d-flex justify-content-start' key={i}>


                        <div className="image ">
                            <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/author/' + a.pict} />
                        </div>
                        <div className="image ">
                            <h5>Etat civil :</h5>
                            <p>Prénom de l'auteur : {a.firstname}</p>
                            <p>Nom de l'auteur : {a.lastname}</p>
                            <p>date de naissance : {a.dateOfBirth}</p>
                            <p>Nom de l'auteur : {a.dateOfDeath}</p>
                            <p>Création de l'auteur : {a.creation}</p>
                            {/* <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} /> */}
                        </div>


                        <p>{a.biography.substring(0,489)}...</p>
                        <Link to={`/movie/${a.id}`}>
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
        authors: store.authors,
        auteurs: store.auteurs
    }
}

const mapDispatchToProps = {
    loadMovies, loadCharacters, loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(Author)

