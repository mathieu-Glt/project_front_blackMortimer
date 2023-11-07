import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { loadMovies, loadMoviesFavories, loadOneMovieById } from '../actions/movie/movieAction';
import { register, logout } from "../actions/user/userActions";
import { useForm } from "react-hook-form";
import validator from 'validator';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from "../actions/auth/authAction";
import { useLocalStorage } from "../utils/useLocalStorage.ts";
import { useNavigate, useNavigation } from "react-router-dom";
import requests from "../services/api/request";
import axios from "axios";


const Login = (props) => {
    console.log("🚀 ~ file: Login.js:11 ~ Login ~ props:", props)
    const navigate = useNavigate();
    // const navigation = useNavigation();
    // console.log("🚀 ~ file: Login.js:19 ~ Login ~ navigation:", navigation)


    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const STORAGE_USER = "user";

    const [storeUser, setStoreUser] = useLocalStorage(STORAGE_USER, {})

    // const [isLogged, setIsLogged] = useState(false);

    const [error, setError] = useState([]);
    const [email, setEmail] = useState("")

    // useEffect(() => {
    //     // navigate(-1)
    // }, [isLogged])

    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log(value);
        setUser({ ...user, [name]: value })

    }


    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");

        const validationErrors = {};


        if (!validator.isEmail(user.email)) {
            validationErrors.email = 'The fields is not an email'
        }

        if (validator.isEmpty(user.password)) {
            validationErrors.password = 'The password is required'
        } else if (!validator.isStrongPassword(user.password)) {
            validationErrors.password = 'The fields is not an password strong'
        }

        console.log(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
        } else {
            console.log('Todo Buen !');
            console.log("🚀 ~ file: Login.js:73 ~ Login ~ user:", user.email)
            props.login(user);
            const body = {
                "email": user.email
            }
            console.log("🚀 ~ file: Login.js:77 ~ handleSubmit ~ body:", body)
            const userShow = await axios.post(requests.fetchUserConnected, body)
            console.log("🚀 ~ file: Login.js:76 ~ handleSubmit ~ user:", userShow)
            if (userShow.status === 200) {
                console.log("🚀 ~ file: Login.js:81 ~ handleSubmit ~ userShow:", userShow.data.results[0].roles)
                
                const userStorage = {
                    id: userShow.data.results[0].id,
                    email: userShow.data.results[0].email,
                    firstname: userShow.data.results[0].firstname,
                    lastname: userShow.data.results[0].lastname,
                    roles: userShow.data.results[0].roles,
                    username: userShow.data.results[0].username
                }
                // const userStorageStringify = JSON.stringify(userStorage)
                setStoreUser(userStorage);
            }

            setUser({
                email: "",
                password: ""
            })
            setTimeout(() => {
                navigate('/acceuil');
            }, 5000)
        }






    }




    return (
        <>
            <h2>Formulaire de connexion </h2>
            <Form onSubmit={(evt) => handleSubmit(evt)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Entrer votre email :</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        // id="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={(evt) => (handleChange(evt))}
                        isInvalid={!!error.name}

                    />
                    {error.email && <Form.Control.Feedback type='invalid'>{error.email}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Entrer votre mot de passe :</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        // id="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(evt) => (handleChange(evt))}
                        isInvalid={!!error.password}

                    />
                    {error.password && <Form.Control.Feedback type='invalid'>{error.password}</Form.Control.Feedback>}

                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </>
    )

}

const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        user: store.user,
        auth: store.auth

    }
}

const mapDispatchToProps = {
    loadMovies,
    loadMoviesFavories,
    loadOneMovieById,
    login,
    register
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)

