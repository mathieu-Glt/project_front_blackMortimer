import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { loadMovies, loadOneMovieById } from "../../actions/movie/movieAction";
import requests from "../../services/api/request";
import axios from "axios";

const AddMovie = (props) => {
    console.log("🚀 ~ file: AddMovie.js:8 ~ props:", props);

    const navigate = useNavigate();


    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [selectPicture, setSelectPicture] = useState({
        picture: ""
    });
    const [movie, setMovie] = useState({
        category_id: "",
        author_id: "",
        title: "",
        synopsis: "",
        movieUrl: "",
        rating: "",
        slug: ""
        
    });
    
    

    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log("🚀 ~ file: AddMovie.js:27 ~ handleChange ~ value:", value)
        setMovie({ ...movie, [name]: value })
    }
    
    function handleChangePicture(value, fieldname) {
        setSelectPicture({ ...selectPicture, [fieldname]: value });
    }
    
    
    
    
    const postAddMovie = () => {
        console.log('je uis ds le postAddMovie');
        // console.log("🚀 ~ file: AddMovie.js:45 ~ AddMovie ~ movie:", movie)
        let formData = new FormData();
        formData.append('image', selectPicture.picture);
        console.log("🚀 ~ file: AddMovie.js:44 ~ handleSubmit ~ formData:", formData)

        const data = { ...movie, pictureUrl: selectPicture.picture.name}
        console.log("🚀 ~ file: AddMovie.js:57 ~ postAddMovie ~ data:", data)
console.log(typeof(localStorage.getItem('access_token')));

        axios({
            method: "post",
            url: requests.fetchUploadPicture,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                "x-access-token": localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => {
            console.log("🚀 ~ file: AddMovie.js:69 ~ .then ~ response:", response)
            if(response.data.status) {
                console.log("Tout s'est bien passée pour l'envoie image");
            }
            
        })
        .catch((error) => {
            console.log("🚀 ~ file: AddMovie.js:73 ~ postAddMovie ~ error:", error)
            
        })


    }

    
    
    
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");
        console.log("🚀 ~ file: AddMovie.js:25 ~ AddMovie ~ movie:", movie)
        const category_id = parseInt(movie.category_id)
        const author_id = parseInt(movie.author_id)
        const rating = parseInt(movie.rating)
        
        if (movie.title === "" || movie.synopsis === "" || movie.movieUrl === "" || movie.slug === "") {
            console.log("condition 1");
            setError("Tous les champs ne sont pas remplis")

            
        } else if (isNaN(category_id) || isNaN(author_id) || isNaN(rating)) {
            console.log("condition 2");
            
            setError("Les champs category, author et rating doivent être des chiffres ! ")
            
            
        } else {
            console.log("condition 3");
            postAddMovie();

            
        }
        
        console.log("🚀 ~ file: AddMovie.js:15 ~ AddMovie ~ error:", error)
        console.log(typeof(category_id));
        console.log(isNaN(category_id));
        console.log(isNaN(author_id));
        console.log(isNaN(rating));
    }




console.log(error);


    return (
        <>
            <h2>Formulaire de creation d'un film</h2>
            {error !== null && <p>{error}</p>}
            <form onSubmit={(evt) => handleSubmit(evt)} encType="multipart/form-data">
                <label htmlFor="category_id">Entrer la catégorie du film :</label>
                <input
                    type="number"
                    className="form-control"
                    id="category_id"
                    name="category_id"
                    value={movie.category_id}
                    placeholder="exemple: un entier 1: sciences-fiction, 2: aventures-humour, 3: humour"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.category_id && <span>{error.category_id}</span>}
                <br></br>
                <label htmlFor="author_id">Entrer l'auteur du film :</label>
                <input
                    type="number"
                    className="form-control"
                    id="author_id"
                    name="author_id"
                    value={movie.author_id}
                    placeholder="exemple: un entier 1: Herge, 2: E.P.Jacobs, 3: Goscinny"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.author_id && <span>{error.author_id}</span>}
                <br></br>
                <label htmlFor="title">Entrer le titre du film :</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={movie.title}
                    placeholder="exemple: Les aventures de Tintin"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.title && <span>{error.title}</span>}
                <br></br>
                <label htmlFor="picture">Entrer la nomination de l'image :</label>
                <input
                    type="file"
                    className="form-control"
                    id="picture"
                    name="picture"
                    accept="image/*"
                    placeholder=" exemple: 1.jpg"
                    onChange={(evt) => handleChangePicture(evt.target.files[0], "picture")}
                />
                {error.picture && <span>{error.picture}</span>}
                <br></br>
                <label htmlFor="synopsis">Entrer la description du film :</label>
                <input
                    type="text"
                    className="form-control"
                    id="synopsis"
                    name="synopsis"
                    value={movie.synopsis}
                    placeholder=" exemple: Lorem ipsum dolor sit amet"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.synopsis && <span>{error.synopsis}</span>}
                <br></br>
                <label htmlFor="movie">Entrer l'url du film :</label>
                <input
                    type="url"
                    className="form-control"
                    id="movieUrl"
                    name="movieUrl"
                    value={movie.movieUrl}
                    placeholder=" exemple: https://movie-youtube.com"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.movieUrl && <span>{error.movieUrl}</span>}
                <br></br>
                <label htmlFor="rating">Entrer une note sur le film :</label>
                <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={movie.rating}
                    placeholder=" exemple: 2"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.rating && <span>{error.rating}</span>}
                <br></br>
                <label htmlFor="slug">Entrer le slug du titre du film :</label>
                <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={movie.slug}
                    placeholder=" exemple: les-aventures-de-tintin"
                    onChange={(evt) => handleChange(evt)}
                />
                {error.slug && <span>{error.slug}</span>}
                <br></br>
                <input
                    type="submit"
                    value="Valider le formulaire"
                    className="btn btn-primary"
                />
            </form>
        </>
    )



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
    loadMovies,
    loadOneMovieById
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie)

