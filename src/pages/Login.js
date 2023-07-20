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

    // useEffect(() => {
    //     // navigate(-1)
    // }, [isLogged])
    
    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log(value);
        setUser({ ...user, [name]: value })

    }


    function handleSubmit(evt) {
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
            props.login(user);

            setStoreUser(user);
            setUser({
                email: "",
                password: ""
            })
            // window.location.href = "/";
            setTimeout(() => {
                navigate('/acceuil');
            }, 5000)
        }



        console.log('Le user : ', user);



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

