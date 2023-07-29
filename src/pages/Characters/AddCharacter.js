import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import validator from 'validator';
import { loadMovies, loadOneMovieById } from "../../actions/movie/movieAction";
import requests from "../../services/api/request";
import axios from "axios";

const AddCharacter = (props) => {
    console.log("🚀 ~ file: AddCharacter.js:11 ~ AddCharacter ~ props:", props)

    const navigate = useNavigate();


    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false)

    const [selectPicture, setSelectPicture] = useState({
        picture: ""
    });

    const [character, setCharacter] = useState({
        firstname: "",
        lastname: "",
        occupation: "",
        information: "",
        slug: ""

    });



    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log("🚀 ~ file: AddCharacter.js:37 ~ handleChange ~ value:", value)
        setCharacter({ ...character, [name]: value })
    }

    function handleChangePicture(value, fieldname) {
        setSelectPicture({ ...selectPicture, [fieldname]: value });
    }

    const saveCharacter = (datas) => {
        console.log("🚀 ~ file: AddCharacter.js:46 ~ saveCharacter ~ datas:", datas)
        const body = {
            firstname: datas.firstname,
            lastname: datas.lastname,
            information: datas.information,
            picture: datas.pictureUrl,
            occupation: datas.occupation,
            slug: datas.slug
        }
        console.log("🚀 ~ file: AddCharacter.js:54 ~ saveCharacter ~ body:", body)

        axios.post(requests.postCharacterDatabase, body, {
            headers: {
                'x-access-token': localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'

            }
        })
            .then((response) => {
                console.log("🚀 ~ file: AddCharacter.js:64 ~ .then ~ response:", response)
                if (response.data.status === 200) {
                    setRedirect(true)
                }
            })
            .catch(err => console.log(err))

    }




    const postAddCharacter = () => {
        console.log('je uis ds le postAddCharacter');
        // console.log("🚀 ~ file: AddMovie.js:45 ~ AddMovie ~ movie:", movie)
        let formData = new FormData();
        formData.append('image', selectPicture.picture);
        console.log("🚀 ~ file: AddCharacter.js:57 ~ postAddCharacter ~ formData:", formData)

        // const data = { ...movie, pictureUrl: selectPicture.picture.name}
        console.log(localStorage.getItem('access_token'));

        axios({
            method: "post",
            url: requests.postUploadPictureCharacter,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                "x-access-token": localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => {
                console.log("🚀 ~ file: AddCharacter.js:75 ~ .then ~ response:", response)
                if (response.data.status === 200) {
                    console.log("Tout s'est bien passée pour l'envoie image");
                    const datas = {
                        ...character,
                        pictureUrl: response.data.pictureUrl
                    }
                    console.log("🚀 ~ file: AddMovie.js:74 ~ .then ~ datas:", datas)
                    saveCharacter(datas);

                }

            })
            .catch((error) => {
                console.log("🚀 ~ file: AddMovie.js:73 ~ postAddMovie ~ error:", error)

            })


    }





    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");
        console.log("🚀 ~ file: AddCharacter.js:31 ~ AddCharacter ~ character:", character)

        if (character.firstname === "" || character.lastname === "" | character.occupation === "" | character.information === "" || character.slug === "") {
            console.log("condition 1");
            setError("Tous les champs ne sont pas remplis")

        } else {
            console.log("condition 2");
            postAddCharacter();
        }
    }




    if (redirect) {
        return <Navigate to="/characters" />
    }

    return (
        <div className="page_add">
            <h2>Formulaire de creation d'un personnage</h2>
            {error !== null && <p>{error}</p>}
            <div className='container_add'>
                <div className='image_movie'>
                    <img className="image_editmovie" alt="B&M" src={process.env.PUBLIC_URL + 'images/assets/images.jpeg'} />
                </div>
                <div className='formadd_movie'>
                <h2>Formulaire pour ajouter un personnage</h2>
                    <form onSubmit={(evt) => handleSubmit(evt)} encType="multipart/form-data">
                        <label htmlFor="firstname">Entrer le prénom du personnage :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={character.firstname}
                            placeholder="exemple: Allan"
                            onChange={(evt) => handleChange(evt)}
                        />
                        <br></br>
                        <label htmlFor="lastname">Entrer le nom du personnage :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={character.lastname}
                            placeholder="exemple: Thompson"
                            onChange={(evt) => handleChange(evt)}
                        />
                        <br></br>
                        <label htmlFor="occupation">Entrer l'occupation du personnage :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="occupation"
                            name="occupation"
                            value={character.occupation}
                            placeholder="exemple: Fonctionnnaire"
                            onChange={(evt) => handleChange(evt)}
                        />
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
                        <br></br>
                        <label htmlFor="information">Entrer les informations relative au personnage :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="information"
                            name="information"
                            value={character.information}
                            placeholder=" exemple: information sur le personnage dans la série"
                            onChange={(evt) => handleChange(evt)}
                        />
                        <br></br>
                        <label htmlFor="slug">Entrer le nom du peronnage sous forme de slug :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="slug"
                            name="slug"
                            value={character.slug}
                            placeholder=" exemple: allan-thompson"
                            onChange={(evt) => handleChange(evt)}
                        />
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
        authors: store.authors

    }
}


const mapDispatchToProps = {
    loadMovies,
    loadOneMovieById
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCharacter)

