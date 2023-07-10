import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadMovies, loadMoviesFavories, loadMoviesRandom, loadOneMovieById } from '../../actions/movie/movieAction';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "../../components/Caroussel/carrousel";


const Home = (props) => {
    console.log("🚀 ~ file: home.js:9 ~ Home ~ props:", props)
    console.log("🚀 ~ file: home.js:9 ~ Home ~ props:", props.movies.movies)

    
    return (
        <>
        <h2>Page Home</h2>

        <Slider/>

      </>

    )
}


const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        user: store.user,
        auth: store.auth 
    }
}

const mapDispatchToProps = {
    loadMovies,
    loadMoviesFavories,
    loadOneMovieById,
    loadMoviesRandom
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)



