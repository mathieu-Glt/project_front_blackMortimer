import axios from "axios";
import { connect } from 'react-redux';
import { loadMoviesFavories } from "../../actions/movie/movieAction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './pagefavories.css'


const Favories = (props) => {
    console.log("Les props de favories : ", props);
    const data = props.movies.movies;


    useEffect(() => {
        props.loadMoviesFavories()
    }, [])


    return (
        <div>
            <>
            <h2 className="title_page_favories">Page des favoris</h2>
            <section className='card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4'>
                {console.log("Les datas des movies : ", data)}
                {data.map((m, i) => (
                    // <Movie movie={m} />
                    <div className='card_movie_container' key={i}>


                        <div className="image ">
                            <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                        </div>


                        <p>{m.synopsis}</p>
                        <Link to={`/movie/${m.id}`}>
                            <button className="card_button_acceuil_details bg-warning">
                                Voir les détails
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
    return {
        movies: store.movies
    }
}

const mapDispatchToProps = {
    loadMoviesFavories
}

export default connect(mapStateToProps, mapDispatchToProps)(Favories)
