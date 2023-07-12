import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadMovies, loadMoviesFavories, loadMoviesRandom, loadOneMovieById } from '../../actions/movie/movieAction';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "../../components/Caroussel/carrousel";
import './pagehome.css'
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';



const Home = (props) => {
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)

    console.log("🚀 ~ file: home.js:9 ~ Home ~ props:", props)
    console.log("🚀 ~ file: home.js:9 ~ Home ~ props:", props.movies.movies)
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)


    
    return (
        <>
        <h2  class='title_page'>Page Home</h2>

        <Slider theme={themeApp}/>

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



