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
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadMoviesBySearch } from './actions/movie/movieAction';
import axios from 'axios';
import requests from './services/api/request';
import { ThemeContext } from './context';
import Footer from './components/Footer/footer';
import { useContext } from 'react'
import React, { createContext } from 'react';
import { handleStorage } from './utils/handleStorage';
export const DataContext = createContext()



function App(props) {
  console.log("🚀 ~ file: App.js:19 ~ App ~ props:", props)
  const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
  console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
  console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
  console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)



  // recuperation du store movies 
  // const { movies } = props;

  // booleen pour la gestion de l'affichage du résultat de la barre de recherche
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [userStorage, setUserStorage] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleData, setTogleData] = useState(false);
  // const [toggleThemeApp, setToggleThemeApp] = useState(false);
  const [resutSearchMovie, setResultSearchMovie] = useState('');
  const [resutSearchMovieByAuthor, setResultSearchMovieByAuthor] = useState('');
  const [resutSearchMovieByCategory, setResultSearchMovieByCategory] = useState('');
  const [movies, setMovies] = useState([]);
  const [moviesByAuthor, setMoviesByAuthor] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState([]);
  
  useEffect(() => {
    async function fetchDataUser(){
      try {
        const user = await handleStorage();
        console.log("🚀 ~ file: App.js:57 ~ handleStorage ~ user:", user)
      } catch (error) {
        console.log("🚀 ~ file: App.js:59 ~ handleStorage ~ error:", error)
        
      }
    }

    fetchDataUser()
  }, [])
  



  // fonction soumission formulaire recherche titre film se trouvant dans App
  const handleSubmitSearchMoviesByQuery = (e, searchMovie) => {
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
      }
    })
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

  // fonction soumission formulaire recherche titre film se trouvant dans App
  const handleSubmitSearchMoviesByAuthor = (e, searchAuthors) => {
    console.log(' clic search author');
    console.log("🚀 ~ file: App.js:20 ~ handleSubmitSearchByAuthor ~ searchAuthors:", searchAuthors)
    e.preventDefault();
    // setCloseSearchBar(true)
    //TODO: creee requête axios ici de recherche film
    axios.get(requests.fetchMoviesByAuthor + searchAuthors, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    })
      .then((response) => {
        console.log('Les films de la recherche pour auteur : ', response.data.results);
        setMoviesByAuthor(response.data.results)
      })
      .catch(err => console.log(err))

    setTimeout(() => {
      setResultSearchMovieByAuthor(moviesByAuthor);
      setTogleData(!toggleData);
    }, 1000)

    setTimeout(() => {
      // setData(data)
      setToggleSearchBar(!toggleSearchBar);
    }, 1000)


  }

    // fonction soumission formulaire recherche titre film se trouvant dans App
    const handleSubmitSearchMoviesByCategory = (e, searchCategorie) => {
      console.log(' clic search author');
      console.log("🚀 ~ file: App.js:20 ~ handleSubmitSearchByAuthor ~ searchAuthors:", searchCategorie)
      e.preventDefault();
      // setCloseSearchBar(true)
      //TODO: creee requête axios ici de recherche film
      axios.get(requests.fetchMoviesByCategory + searchCategorie, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*'
        }
      })
        .then((response) => {
          console.log('Les films de la recherche pour auteur : ', response.data.results);
          setMoviesByCategory(response.data.results)
        })
        .catch(err => console.log(err))
  
      setTimeout(() => {
        setResultSearchMovieByCategory(moviesByCategory);
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
  console.log(' le résultat de App pour la recherche film par auteur : ', moviesByAuthor);
  console.log(' le résultat de App pour la recherche film par auteur : ', moviesByCategory);


  return (
    <>
      <div className='App'>
        <Router>
          <Navigation handleSubmitSearchMoviesByCategory={handleSubmitSearchMoviesByCategory} handleSubmitSearchMoviesByQuery={handleSubmitSearchMoviesByQuery} handleSubmitSearchMoviesByAuthor={handleSubmitSearchMoviesByAuthor} />
          
          {/* recherche film par query */}
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


                      <h4 className='bg-info'>{m.title}</h4>
                      <p>{m.synopsis.substring(0, 489)}...</p>
                      <button className="card_button_acceuil_details btn btn-primary ">
                        Plus
                      </button>

                    </div>

                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* recherche film par auteur  */}
          <div className={`${toggleSearchBar ? 'close_serach_movie' : 'close_serach_movie_transparent'}`}>
            <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
              <div className='results_search'>
                <h5 className='title_button_close_searchbar'>Résultat de la recherche
                  <button className='button_close_results_searchbar' onClick={handleClickSearchClose}>Close</button>
                </h5>
                <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
                  {moviesByAuthor.map((m, i) => (
                    <div className='card_movie_container ' key={i}>


                      <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                      </div>

                      <h4 className='bg-info'>{m.title}</h4>
                      <p>{m.synopsis.substring(0, 489)}...</p>
                      <button className="card_button_acceuil_details btn btn-primary ">
                        Plus
                      </button>

                    </div>

                  ))}
                </div>
              </div>

            </div>
          </div>

            {/* recherche film par categorie  */}
            <div className={`${toggleSearchBar ? 'close_serach_movie' : 'close_serach_movie_transparent'}`}>
            <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
              <div className='results_search'>
                <h5 className='title_button_close_searchbar'>Résultat de la recherche
                  <button className='button_close_results_searchbar' onClick={handleClickSearchClose}>Close</button>
                </h5>
                <div className={`${toggleSearchBar ? 'result_serach_movie' : 'result_serach_movie_transparent'}`}>
                  {moviesByCategory.map((m, i) => (
                    <div className='card_movie_container ' key={i}>


                      <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture} />
                      </div>

                      <h4 className='bg-info'>{m.title}</h4>
                      <p>{m.synopsis.substring(0, 489)}...</p>
                      <button className="card_button_acceuil_details btn btn-primary ">
                        Plus
                      </button>

                    </div>

                  ))}
                </div>
              </div>

            </div>
          </div>





          {/* <Routes>
            <Route path="/" element={<Home theme={toggleThemeApp}/>} />
            <Route path="/acceuil" element={<Acceuil theme={toggleThemeApp}/>} />
            <Route path="/characters" element={<Characters theme={toggleThemeApp}/>} />
            <Route path="/authors" element={<Author theme={toggleThemeApp}/>} />
            <Route path="/favories" element={<Favories theme={toggleThemeApp}/>} />
            <Route path="/editmovie/:id" element={<EditMovie theme={toggleThemeApp}/>} />
            <Route path="/movie/:id" element={<MovieId />} />
            <Route path="/register" element={<Register theme={toggleThemeApp}/>} />
            <Route path="/login" element={<Login theme={toggleThemeApp}/>} />
          </Routes>
          </Router>
          <Footer/> */}
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
        <Footer />
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
