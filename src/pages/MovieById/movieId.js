import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';

const MovieId = (props) => {
    const params = useParams();
    console.log(params);
    const id = params.id;

    console.log("Les props de movieById : ", props);
    const data = props.movies.movies;

    useEffect(() => {
        props.myActionWithPram(id)
    }, [])



    return (
        <div>
            <h2>Détails du film</h2>
            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">
                {console.log("Les datas de moviebyid : ", data)}
                <div className="card_movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center">
                    <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + data.picture} />
                    </div>
                    <p>{data.synopsis}</p>
                    <Link to={`/editmovie/${data.id}`}>
                        <button type='button' className='card_button_acceuil_edit'>
                            Editer le film
                        </button>
                    </Link>

                </div>
            </section>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        movies: store.movies
    }
}

const mapDispatchToProps = (dispatch) => {
    const myActionWithPram = (id) => {
        dispatch(loadOneMovieById(id))
    }

    return {
        myActionWithPram,
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieId)

