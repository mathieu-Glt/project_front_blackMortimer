import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { loadMovies, loadMoviesFavories, loadOneMovieById } from '../actions/movie/movieAction';
import { register } from "../actions/user/userActions";
import { login, logout } from "../actions/auth/authAction";
import { useForm } from "react-hook-form";
import validator from 'validator';

const Register = (props) => {
    console.log("Les props de register : ", props);

    // const [firstname, setFirstName] = useState('');
    // const [lastname, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState([]);


    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log(value);
        setUser({ ...user, [name]: value })

        // setFirstname(e.target.value)
    }


    function handleSubmit(evt) {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");


        // console.log(data);
        const validationErrors = {};

        if (validator.isEmpty(user.firstname)) {
            validationErrors.firstname = 'The firstname is required'
        }
        if (validator.isEmpty(user.lastname)) {
            validationErrors.lastname = 'The lastname is required'
        }
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
            props.register(user);

            setUser({
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            })


        }



    }




    return (
        <>
            <h2>Formulaire d'inscription </h2>
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <label htmlFor="firstname">Entrer votre prénom :</label>
                {/* <input {...register('firstname', { required: true })} type="text" class="form-control" id="firstname" name="firstname" placeholder="mathieu" /> */}
                {/* {errors.firstname && <span>Ce champs est requis </span>} */}
                <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={user.firstname}
                    placeholder="mathieu"
                    onChange={(evt) => handleChange(evt)} />
                {error.firstname && <span>{error.firstname}</span>}
                <br></br>
                <label htmlFor="lastname">Entrer votre nom :</label>
                {/* <input {...register('lastname', { required: true })} type="text" class="form-control" id="lastname" name="lastname" placeholder="Le Duc" /> */}
                {/* {errors.lastname && <span>Ce champs est requis </span>} */}
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={user.lastname}
                    onChange={(evt) => handleChange(evt)}
                    placeholder="Le Duc"
                />
                {error.lastname && <span>{error.lastname}</span>}
                <br></br>
                <label htmlFor="email">Entrer votre email :</label>
                {/* <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" class="form-control" id="email" name="email" placeholder="name@example.com" /> */}
                {/* {errors.email && <span>champs email invalide </span>} */}
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(evt) => handleChange(evt)}
                    placeholder="name@example.com"
                />
                {error.email && <span>{error.email}</span>}
                <br></br>
                <label htmlFor="password">Entrer votre mot de passe :</label>
                {/* <input {...register('password', { required: true, minLength: 6 })} type="password" class="form-control" id="password" name="password" placeholder="un bon mot de passe" /> */}
                {/* {errors.password && <span>champs password invalide </span>} */}
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={(evt) => handleChange(evt)}
                    placeholder="un bon mot de passe"
                />
                {error.password && <span>{error.password}</span>}
                <input
                    type="submit"
                    value="Envoyer votre message"
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
        // loading: 

    }
}

const mapDispatchToProps = {
    loadMovies,
    loadMoviesFavories,
    loadOneMovieById,
    login,
    logout,
    register
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)
