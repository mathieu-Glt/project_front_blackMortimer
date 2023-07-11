import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Acceuil from './pages/Acceuil/acceuil';
import Navigation from './components/Nav/nav';
import Favories from './pages/Favories/PageFavories';
import Home from './pages/Home/PageHome';
import EditMovie from './pages/Movie/EditMovie';
import MovieId from './pages/MovieById/movieId';
import Register from './pages/Register';
import Login from './pages/Login';
import Characters from './pages/Characters/characters';
import Author from './pages/Author/author';
import SearchBar from './components/SearchBar/searchBar';
import { useState } from 'react';
import { connect } from 'react-redux';
import { loadMoviesBySearch } from './actions/movie/movieAction';
import axios from 'axios';
import requests from './services/api/request';
import { ThemeContext } from './context';
import Footer from './components/Footer/footer';
import React, {createContext } from 'react';
export const DataContext= createContext()



function App(props) {
    console.log("🚀 ~ file: App.js:19 ~ App ~ props:", props)
    
    // recuperation du store movies 
    // const { movies } = props;

    // booleen pour la gestion de l'affichage du résultat de la barre de recherche
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleData, setTogleData] = useState(false);
    const [resutSearchMovie, setResultSearchMovie] = useState('');
    const [movies, setMovies] = useState([]);


    // fonction soumission formulaire se trouvant dans App
    const handleSubmitSearchForm = (e, searchMovie) => {
      console.log(' clic search movie');
      console.log("🚀 ~ file: App.js:20 ~ handleSubmitSearchForm ~ searchMovie:", searchMovie)
      e.preventDefault();
      // setCloseSearchBar(true)
      //TODO: creee requête axios ici de recherche film
      // props.loadMoviesBySearch(searchMovie);
      axios.get(requests.fetchMovieBySearch + searchMovie, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*'
      }})
      .then((response) => {
        console.log('Les films de la recherche : ', response.data.results);
        setMovies(response.data.results)
      })
      .catch(err => console.log(err))

      setTimeout(() => {
        setResultSearchMovie(movies);
        setTogleData(!toggleData);
      }, 1000)

      setTimeout(() => {
        // setData(data)
        setToggleSearchBar(!toggleSearchBar);
      }, 1000)
  


    }

    // fonction pour fermer l'affichage de la recherche
    const handleClickSearchClose = (e) => {
      e.preventDefault();
      setToggleSearchBar(!toggleSearchBar);
      // on redirige vers l'acceuil
      // windows.location.href("/")



    }


  console.log(' le résultat de App pour la recherche film : ', movies);


  return (
    <>
      <div className="App">
        <Router>
          <Navigation handleSubmitSearchForm={handleSubmitSearchForm}/>
       <div className={`${toggleSearchBar ? 'close_serach_movie' : 'close_serach_movie_transparent'}`}>
        <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
          <div className='results_search'>
            <h5 className='title_button_close_searchbar'>Résultat de la recherche        
              <button className='button_close_results_searchbar' onClick={handleClickSearchClose}>Close</button>
            </h5>
            <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
            {movies.map((m, i) => (
                  <div className='card_movie_container ' key={i}>


                      <div className="image ">
                          <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                      </div>
          
          
                      <p>{m.synopsis.substring(0,489)}...</p>
                              <button className="card_button_acceuil_details btn btn-primary ">
                                    Plus
                              </button>
          
                    </div>
          
            ))}
            </div>
          </div> 

        </div> 
        </div>



          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acceuil" element={<Acceuil />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/authors" element={<Author />} />
            <Route path="/favories" element={<Favories />} />
            <Route path="/editmovie/:id" element={<EditMovie />} />
            <Route path="/movie/:id" element={<MovieId />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </Router>
          <Footer/>
      </div>
    </>
  );
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
  loadMoviesBySearch
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
