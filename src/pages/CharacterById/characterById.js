import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';
import { loadOneCharacterById } from '../../actions/character/characterActions';


const CharacterId = (props) => {
    console.log("🚀 ~ file: characterById.js:9 ~ CharacterId ~ props:", props)
    const params = useParams();
    console.log(params);
    const id = params.id;


    const data = props.characters.characters;

    useEffect(() => {
        props.loadOneCharacterById(id)
    }, [])



    return (
        <>
            <h3>Détails du personnage</h3>
            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">
            {console.log("Les datas de characterbyid : ", data)}
            <div className="card_movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center">
            <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + data.picture} />
                    </div>
                    <p>{data.firstname}</p>
                    <p>{data.lastname}</p>
                    <p>{data.occupation}</p>
                    <p>{data.information}</p>
                    <Link to={`/editmovie/${data.id}`}>
                        <button type='button' className='card_button_acceuil_edit'>
                            Editer le personnage
                        </button>
                    </Link>

                
                 </div>
            
            </section>

        </>
    )
}

const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        characters: store.characters
    }
}

const mapDispatchToProps = {

    loadOneCharacterById

}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterId)