import React, { useEffect } from 'react';
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';
import { userConnected } from '../../actions/auth/authAction';
import axios from 'axios';
import requests from '../../services/api/request';
import { loadOneCharacterById } from '../../actions/character/characterActions';



const EditCharacter = (props) => {
    console.log("Les props de edit character : ", props);
    const params = useParams();
    let id = params.id


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


    useEffect(() => {
        props.loadOneCharacterById(id)
    }, [id])

    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        setCharacter({ ...character, [name]: value })
    }
    
    function handleChangePicture(value, fieldname) {
        setSelectPicture({ ...selectPicture, [fieldname]: value });
    }

    const saveCharacter = (datas) => {
        console.log('je suis dans le saveCharcter ');
        const body = {
            firstname: datas.firstname,
            lastname: datas.lastname,
            information: datas.information,
            picture: datas.pictureUrl,
            occupation: datas.occupation,
            slug: datas.slug
        }
        console.log("🚀 ~ file: EditCharacter.js:59 ~ saveCharacter ~ body:", body)

        axios.put(requests.putCharacterDatabase + id, body, {
            headers: {
                'x-access-token': localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'

            }
        })
            .then((response) => {
                if (response.data.status === 200) {
                    setRedirect(true)
                }
            })
            .catch(err => console.log(err))

    }


    const putCharacter = () => {
        console.log('je suis ds le putCharacter');
        let formData = new FormData();
        formData.append('image', selectPicture.picture);
        const data = { ...character, pictureUrl: selectPicture.picture.name }
        console.log("🚀 ~ file: EditCharacter.js:82 ~ putCharacter ~ data:", data)
        console.log(typeof (localStorage.getItem('access_token')));
        console.log(localStorage.getItem('access_token'));


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
        if (response.data.status === 200) {
            const datas = {
                ...character,
                pictureUrl: response.data.pictureUrl
            }
            saveCharacter(datas);

        }

    })
    .catch((error) => {
    console.log("🚀 ~ file: EditCharacter.js:106 ~ putCharacter ~ error:", error)

    })


    }



    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");
        console.log(" Les personnages :", character);

        if (character.firstname === "" || character.lastname === "" || character.occupation === "" || character.information === "" || character.slug === "") {
            console.log("condition 1");
            setError("Tous les champs ne sont pas remplis")


        } else {
            console.log("condition 3");
            putCharacter();
        


        }

    }



    return (
        <div className='page_edit'>
            <h2>Page pour éditer un personnage</h2>
            <div className='container_edit'>
                <div className='image_movie'>
                <img className="image_editmovie" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + props.characters.characters.picture} />
                </div>
                <div className='formedit_movie'>
                    <h4>{props.characters.characters.lastname} {props.characters.characters.firstname}</h4>
                    <h2>Formulaire pour editer un personnage</h2>
            {error !== null && <p>{error}</p>}
            <form onSubmit={(evt) => handleSubmit(evt)} encType="multipart/form-data">
                {error.author_id && <span>{error.author_id}</span>}
                <br></br>
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
                {error.title && <span>{error.title}</span>}
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
                {error.picture && <span>{error.picture}</span>}
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
                {error.synopsis && <span>{error.synopsis}</span>}
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
                {error.movieUrl && <span>{error.movieUrl}</span>}
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
                {error.rating && <span>{error.rating}</span>}
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
    loadOneCharacterById, userConnected

}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacter)
