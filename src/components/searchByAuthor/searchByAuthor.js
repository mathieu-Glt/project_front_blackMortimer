import React, { useEffect, useState } from 'react';
import './searchbyauthor.css';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { loadAuthorsByNameArtist } from '../../actions/author/authorActions';
import { loadAuthors } from '../../actions/auteur/auteurActions';

const SearchByAuthor = (props) => {
    console.log("🚀 ~ file: searchByAuthor.js:11 ~ SearchByAuthor ~ props:", props)
    const { handleSubmitSearchMoviesByAuthor } = props
    const { author } = props



    const [isLoading, setIsLoading] = useState(true);
    const [nameArtist, setNameArtist] = useState([])
    const [error, setError] = useState(null);
    const [searchAuthors, setSearchAuthors] = useState('');
    // booléen gestion affichage bouton validation barre de recherche
    const [toggleSearch, setToggleSearch] = useState(false);
    const auteur = props.authors.author



    // fonction soumission formulaire se trouvant dans App
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitSearchMoviesByAuthor(e, searchAuthors);
        setSearchAuthors('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('valeur name: ' + name, 'value: ' + value);
        setSearchAuthors(value);
    };

    // fonction qui active l'affichage du bouton barre de recherche
    const searchClick = (e) => {
        e.preventDefault();
        setToggleSearch(!toggleSearch);
    };

    console.log("🚀 ~ file: searchByAuthor.js:18 ~ SearchByAuthor ~ searchAuthors:", searchAuthors)


    return (
        <>
        {console.log('les auteurs : ', props.authors.author)}
            <button className="searchIcon_author" onClick={searchClick}>Recherche par Auteur</button>
            <Form
                onSubmit={handleSubmit}
                className={`${toggleSearch ? 'search_form_author' : 'search_transparent_author'}`}
                >
                <Form.Select
                    aria-label="Default select example"
                    // value={selectedOption || ''}
                    onChange={handleChange}
                    >
                        <option value="">Select an Author</option>
                        <option value="3">{props.authors.author[0]}</option>
                        <option value="1">{props.authors.author[1]}</option>
                        <option value="2">{props.authors.author[2]}</option>
                </Form.Select>
                <Button
                    className='button_submit_author'
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
        user: store.user,
        authors: store.authors
    }
}

const mapDispatchToProps = {
    loadAuthors, loadAuthorsByNameArtist
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByAuthor)
