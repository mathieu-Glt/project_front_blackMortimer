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


function Navigation(props) {
    console.log("Les props de navigation : ", props);


    return (
        <>
                    <Navbar expand="lg" className="bg-warning">
                        <Container>
                            <Navbar.Brand href="/">MOVIES</Navbar.Brand>
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
                        <SearchByAuthor/>
                        <SearchByCategory/>
                        <SearchBar handleSubmitSearchForm={props.handleSubmitSearchForm}/>
                    </Navbar >
        </>
    )
}

export default Navigation;



// const mapStateToProps = store => {
//     console.log({ store });
//     return {
//         movies: store.movies,
//         characters: store.characters,
//         auth: store.auth,
//         user: store.user
//     }
// }

// const mapDispatchToProps = {
//     loadMovies
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

