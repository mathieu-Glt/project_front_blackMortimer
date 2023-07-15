import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/movie/movieAction';
import SearchBar from '../SearchBar/searchBar';
import { Link } from 'react-router-dom';
import SearchByAuthor from '../searchByAuthor/searchByAuthor';
import SearchByCategory from '../searchByCategory/searchByCategory';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';
import LogoNavigation from '../LogoNavigation/logo';
import { loadAuthorsByNameArtist } from '../../actions/author/authorActions';
import React, { useEffect, useState } from 'react';
import { loadCategories } from '../../actions/category/categoryActions';
import { loadAuthors } from '../../actions/auteur/auteurActions';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';import { handleStorage } from '../../utils/handleStorage';
import './nav.css'
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'



const theme = createTheme({
    palette: {
      primary: red,
    },
  });


function Navigation(props) {
    const navigate = useNavigate()

    const [toggleUserIcon, setToggleUserIcon] = useState(false)
    const { handleSubmitSearchMoviesByAuthor } = props
    const { handleSubmitSearchMoviesByCategory } = props
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)

    useEffect(() => {
        props.loadAuthorsByNameArtist();
        props.loadCategories();
        async function fetchDataUser(){
            try {
              const user = await handleStorage();
              console.log("🚀 ~ file: nav.js:7 ~ handleStorage ~ user:", user)
              setToggleUserIcon(true)
            } catch (error) {
              console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)
              
            }
          }
      
          fetchDataUser()
      
    }, [])

    const logout = () => {
        console.log(' click logout');
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        
        // on redirige vers l'acceuil
        
        navigate("/")

    };



    
    console.log("Les props de navigation : ", props);


    return (
        <>
                    <Navbar expand="lg" className={`${themeApp ? 'bg-warning' : 'bg-danger'}`}>
                        <Container>
                            <Navbar.Brand href="/"><LogoNavigation/></Navbar.Brand>
                            {toggleUserIcon ? <PersonIcon color= 'success' className='person_icon'/> : null }
                            {toggleUserIcon ? <LogoutIcon theme={theme} className='person_icon' onClick={logout}/> : null }
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">HOME</Nav.Link>
                                    <Nav.Link href="/acceuil">ACCEUIL</Nav.Link>
                                        <NavDropdown title="Sous-menu" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/characters">CHARACTERS</NavDropdown.Item>
                                        <NavDropdown.Item href="/authors">AUTHOR</NavDropdown.Item>
                                        <NavDropdown.Item href="/favories">FAVORIES MOVIES</NavDropdown.Item>
                                        <NavDropdown.Item href="/login">LOGIN</NavDropdown.Item>
                                        <NavDropdown.Item href="/register">REGISTER</NavDropdown.Item>
                                        <NavDropdown.Item href="/search">SEARCH</NavDropdown.Item>
                                        <NavDropdown.Item href="/basket">BASKET</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            CONTACT
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                        <SearchByAuthor handleSubmitSearchMoviesByAuthor={handleSubmitSearchMoviesByAuthor}/>
                        <SearchByCategory handleSubmitSearchMoviesByCategory={handleSubmitSearchMoviesByCategory}/>
                        {/* <PersonIcon className='person_icon'/> */}

                        <SearchBar handleSubmitSearchMoviesByQuery={props.handleSubmitSearchMoviesByQuery} />
                    </Navbar >
        </>
    )
}

// export default Navigation;



const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        characters: store.characters,
        auth: store.auth,
        user: store.user,
        authors: store.authors,
        categories: store.categories

    }
}

const mapDispatchToProps = {
    loadAuthors, loadAuthorsByNameArtist, loadCategories
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

