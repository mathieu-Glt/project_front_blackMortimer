import React, { useEffect, useState } from 'react';
import './searchbycategory.css';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';


const SearchByCategory = (props) => {
console.log("🚀 ~ file: searchByAuthor.js:11 ~ SearchByAuthor ~ props:", props)


const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [searchMovie, setSearchMovie] = useState('');
// booléen gestion affichage bouton validation barre de recherche
const [toggleSearch, setToggleSearch] = useState(false);


    // fonction soumission formulaire se trouvant dans App
    const handleSubmit = (e) => {
        // e.preventDefault();
        // handleSubmitSearchForm(e, searchMovie);
        // setSearchMovie('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target; 
        console.log('valeur name: ' + name, 'value: ' + value);
        // setSearchMovie(value);
    };

    // fonction qui active l'affichage du bouton barre de recherche
    const searchClick = (e) => {
        e.preventDefault();
        setToggleSearch(!toggleSearch);
    };
    


return (
    <>
    <button className="searchIcon_category" onClick={searchClick}>Recherche par Catégorie</button>
    <Form 
    onSubmit={handleSubmit}
    className={`${toggleSearch ? 'search_form_category' : 'search_transparent_category'}`}
    >
    <Form.Select 
    aria-label="Default select example"
    // value={selectedOption || ''}
    onChange={handleChange}
    >
      <option value="">Select an Category</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Button 
            className='button_submit_category' 
            variant="primary"
            type='submit' 
            >
                Search
            </Button>

    </Form>
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
    // loadMovies, loadCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByCategory)
