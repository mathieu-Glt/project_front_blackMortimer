import React, { useEffect, useState } from 'react';
import './character.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/movie/movieAction';
import { loadCharacters } from '../../actions/character/characterActions';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';



const Character = (props) => {
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)

    console.log("Les props de character : ", props);
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)

    // const data = props.movies.movies;
    const { characters } = props;
    const [character, setCharacter] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        try {
            props.loadCharacters();
            setCharacter(characters);
            setTimeout(() => {

                setIsLoading(false);
            }, 2000)

        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [])

    if (isLoading) {
        return <div>Loading characters...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>
        // setIsLoading(false);

    }
    console.log('voici les props de characters : ', characters);


    return (
        <div>
            <h2 className='title_page_character'>Page personnage des séries</h2>
            <section className={`${themeApp ? 'card_character_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4' : 'card_character_dark d-flex flex-row flex-wrap justify-content-center p-4 pt-4'}`}>

                <Link to={`/addcharacter`}>
                    <button className=" btn btn-primary ">
                        Ajouter un peronnage
                    </button>

                </Link>

                {characters.characters.map((c, i) => (
                    <div className='card_character_container d-flex justify-content-start' key={i}>


                        <div className="image ">
                            <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + c.picture} />
                        </div>


                        <p>{c.information.substring(0, 189)}...</p>
                        <Link to={`/character/${c.id}`}>
                            <button className="card_button_character ">
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
        user: store.user
    }
}

const mapDispatchToProps = {
    loadMovies, loadCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(Character)

