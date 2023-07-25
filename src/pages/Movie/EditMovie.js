import React, { useEffect } from 'react';
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';
import { userConnected } from '../../actions/auth/authAction';
import './movie.css';
import axios from 'axios';
import requests from '../../services/api/request';

const EditMovie = (props) => {
    // console.log("Les props de edit movie : ", props.movies.movies);
    console.log("Les props de edit movie : ", props);
    const params = useParams();
    let id = params.id
    console.log("🚀 ~ file: EditMovie.js:11 ~ EditMovie ~ id:", id)


    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [selectPicture, setSelectPicture] = useState({
        picture: ""
    });
    const [movie, setMovie] = useState({
        title: "",
        synopsis: "",
        movieUrl: "",
        rating: "",
        slug: ""
        
    });


    useEffect(() => {
        props.loadOneMovieById(id)
    }, [id])

    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log("🚀 ~ file: EditMovie.js:39 ~ handleChange ~ value:", value)
        setMovie({ ...movie, [name]: value })
    }
    
    function handleChangePicture(value, fieldname) {
        setSelectPicture({ ...selectPicture, [fieldname]: value });
    }

    const saveMovie = (datas) => {
        console.log("🚀 ~ file: AddMovie.js:46 ~ saveMovie ~ datas:", datas)
        const body = {
            title: datas.title,
            rating: Number(datas.rating),
            picture: datas.pictureUrl,
            movie: datas.movieUrl,
            synopsis: datas.synopsis,
            slug: datas.slug
        }
        console.log("🚀 ~ file: AddMovie.js:48 ~ saveMovie ~ body:", body)

        axios.put(requests.putMovieDatabase + id, body, {
            headers: {
                'x-access-token': localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'

            }
        })
            .then((response) => {
                console.log("🚀 ~ file: AddMovie.js:54 ~ .then ~ response:", response)
                if (response.data.status === 200) {
                    setRedirect(true)
                }
            })
            .catch(err => console.log(err))

    }


    const putMovie = () => {
        console.log('je suis ds le putMovie');
        let formData = new FormData();
        formData.append('image', selectPicture.picture);
        console.log("🚀 ~ file: AddMovie.js:44 ~ handleSubmit ~ formData:", formData)
        const data = { ...movie, pictureUrl: selectPicture.picture.name }
        console.log("🚀 ~ file: AddMovie.js:57 ~ postAddMovie ~ data:", data)
        console.log(typeof (localStorage.getItem('access_token')));


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
        if (response.data.status === 200) {
            console.log("Tout s'est bien passée pour l'envoie image");
            const datas = {
                ...movie,
                pictureUrl: response.data.pictureUrl
            }
            console.log("🚀 ~ file: AddMovie.js:74 ~ .then ~ datas:", datas)
            saveMovie(datas);

        }

    })
    .catch((error) => {
        console.log("🚀 ~ file: AddMovie.js:73 ~ postAddMovie ~ error:", error)

    })


    }



    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");
        const rating = parseInt(movie.rating)

        if (movie.title === "" || movie.synopsis === "" || movie.movieUrl === "" || movie.slug === "") {
            console.log("condition 1");
            setError("Tous les champs ne sont pas remplis")


        } else if (isNaN(rating)) {
            console.log("condition 2");

            setError("Les champs category, author et rating doivent être des chiffres ! ")


        } else {
            console.log("condition 3");
            putMovie();
        


        }

    }



    return (
        <div className='page_edit'>
            <h2>Page pour éditer film</h2>
            <div className='container_edit'>
                <div className='image_movie'>
                <img className="image_editmovie" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + props.movies.movies.picture} />
                </div>
                <div className='formedit_movie'>
                    <h4>{props.movies.movies.title}</h4>
                    <h2>Formulaire pour editer un film</h2>
            {error !== null && <p>{error}</p>}
            <form onSubmit={(evt) => handleSubmit(evt)} encType="multipart/form-data">
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


                </div>

            </div>
        </div>
    )
}

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
    loadOneMovieById, userConnected

}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovie)
