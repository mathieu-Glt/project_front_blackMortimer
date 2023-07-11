import React, { useEffect, useState } from 'react';
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { loadMovies } from '../../actions/movie/movieAction';
import { loadCharacters } from '../../actions/character/characterActions';
import { useContext } from 'react';


const SearchBar = (props) => {
    console.log("🚀 ~ file: searchBar.js:8 ~ SearchBar ~ props:", props)
    const { handleSubmitSearchForm } = props
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchMovie, setSearchMovie] = useState('');
    // booléen gestion affichage bouton validation barre de recherche
    const [toggleSearch, setToggleSearch] = useState(false);


    // fonction soumission formulaire se trouvant dans App
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitSearchForm(e, searchMovie);
        setSearchMovie('');
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target; 
        console.log('valeur name: ' + name, 'valeur value: ' + value);
        setSearchMovie(value);
    };
console.log(searchMovie);
    // fonction qui active l'affichage du bouton barre de recherche
    const searchClick = (e) => {
        e.preventDefault();
        setToggleSearch(!toggleSearch);

    };


    return (
        <>
        <SearchIcon color="primary" className='searchbar_icon' onClick={searchClick}/>
        <Form 
        onSubmit={handleSubmit}
        className={`${toggleSearch ? 'search_form' : 'search_transparent'}`}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control 
            type="text" 
            placeholder="Enter a movie title. . ."
            name='title'
            value={searchMovie} 
            onChange={(e) => handleChangeInput(e)}
            />
          </Form.Group>
          <Button 
            className='button_submit' 
            variant="primary"
            type='submit' 
            >
                Search
            </Button>
        </Form>
        </>
    );



    
}

export default SearchBar;


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
//     loadMovies, loadCharacters
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
