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
import LogoutIcon from '@mui/icons-material/Logout';
import { handleStorage } from '../../utils/handleStorage';
import './nav.css'
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import requests from '../../services/api/request';
import { loadBasket } from '../../actions/basket/basketActions';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Cart from '../Cart/cart';

const theme = createTheme({
    palette: {
        primary: red,
    },
});



function Navigation(props) {
    console.log("🚀 ~ file: nav.js:38 ~ Navigation ~ props:", props)
    const navigate = useNavigate()
    const location = useLocation()
    console.log("🚀 ~ file: nav.js:37 ~ Navigation ~ location:", location)




    const [toggleUserIcon, setToggleUserIcon] = useState(false)
    const { handleSubmitSearchMoviesByAuthor } = props
    const { handleSubmitSearchMoviesByCategory } = props
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
    console.log("🚀 ~ file: App.js:30 ~ App ~ toggleTheme:", toggleTheme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ themeAPP:", themeApp)



    console.log("🚀 ~ file: nav.js:43 ~ Navigation ~ author:", props.author)

    console.log("🚀 ~ file: nav.js:45 ~ Navigation ~ category:", props.category)


    useEffect(() => {
        async function fetchDataUser() {
            try {
                props.loadBasket();
                const user = await handleStorage();
                console.log("🚀 ~ file: nav.js:7 ~ handleStorage ~ user:", user)
                setToggleUserIcon(!toggleUserIcon)
            } catch (error) {
                console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)

            }
        }

        fetchDataUser()

    }, [location.pathname])
    useEffect(() => {
        axios.get(requests.fetchAllAutors)
        .then((response) => {
            console.log("🚀 ~ file: nav.js:79 ~ .then ~ response:", response)
            
        })
        .catch((error) => {
            console.log("🚀 ~ file: nav.js:83 ~ useEffect ~ error:", error)
            
        })
        .finally(() => {
            console.log("🚀 ~ file: nav.js:87 ~ useEffect ~ finalemant je suis dans la méthode finally" )
        })
    })

    console.log("🚀 ~ file: nav.js:38 ~ Navigation ~ toggleUserIcon:", toggleUserIcon)
    const logout = () => {
        console.log(' click logout');
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')

        // on redirige vers l'acceuil
        setToggleUserIcon(!toggleUserIcon)

        setTimeout(() => {
            navigate('/register');
        }, 5000)

    };




    console.log("Les props de navigation : ", props);


    return (
        <>
            <Navbar expand="lg" className={`${themeApp ? 'bg-warning' : 'bg-danger'}`}>
                <Container>
                    <Navbar.Brand href="/"><LogoNavigation /></Navbar.Brand>
                    {toggleUserIcon ? <PersonIcon color='success' className='person_icon' /> : null}
                    {toggleUserIcon ? <LogoutIcon theme={theme} className='person_icon' onClick={logout} /> : null}
                    <Cart />
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
                <SearchByAuthor handleSubmitSearchMoviesByAuthor={handleSubmitSearchMoviesByAuthor} />
                <SearchByCategory handleSubmitSearchMoviesByCategory={handleSubmitSearchMoviesByCategory} />
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
        categories: store.categories,
        basket: store.basket


    }
}

const mapDispatchToProps = {
    loadAuthors, loadAuthorsByNameArtist, loadCategories, loadBasket
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

