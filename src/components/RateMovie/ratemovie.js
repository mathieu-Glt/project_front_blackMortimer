import React, { useEffect, useState } from 'react';
// import './ratestar.scss';
import { FaStar } from "react-icons/fa";
// import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import requests from '../../services/api/request';

// composant des notes de chaque film
function RateMovie(props) {
    // const Component = props.movie.rating ? FavoriteIconFilled : FavoriteIconEmpty;

    console.log(props.movie);
    // console.log(props.movie.rating);
    const stars = Array(5).fill(0);

    console.log(stars);
    // constante qui prends la valeur du clique sur l'etoile
    const [currentValue, setCurrentValue] = useState(0);
    
    // constante qui prends la valeur au survole sur l'etoile
    const [hoverValue, setHoverValue] = useState(undefined);


    // fonction qui au clique sur l'etoile récupère les infos de l'utilisateur
    // si il est connécté on lance la requête pour envoyer sa note du film dans sa liste favoris
    function handleClick(value) {
        console.log("🚀 ~ file: ratemovie.js:30 ~ handleClick ~ value:", value)
        const rate = value;
        setCurrentValue(value)
        const token = localStorage.getItem("access_token");
        const user = localStorage.getItem("user");
        console.log("🚀 ~ file: ratemovie.js:35 ~ handleClick ~ user:", user)
        console.log("🚀 ~ file: ratemovie.js:33 ~ handleClick ~ token:", token)
        const userParse = JSON.parse(user)
        console.log("🚀 ~ file: ratemovie.js:38 ~ handleClick ~ userParse:", userParse)
        const movieRate = props.movieRate
        const movieId = props.movieId
        console.log(props.movieId)
        const datas = {
            'id' : movieId,
            'rate' : rate,
            'user' : userParse.email
        }


        addRateMovie(datas)

        async function addRateMovie(datas) {
            console.log('addRateMovie');
            console.log('datas :', datas);

            try {
                const request = axios.post(requests.postRateMovie, datas, {
                    headers: {
                        "x-access-token": localStorage.getItem('access_token')
                    }
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            // setTimeout(() => {
                            //     toast.success(response.data.msg, { type: "warning", theme: "colored", autoClose: 5000 });
                            // }, 3000);
                            console.log(response.data.msg);
                        }

                    })
                    .catch(error => { console.log(error) });

            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = value => {
        setHoverValue(undefined)
    };

    const colors = {
        orange: "#FFC433",
        grey: "#CAC9C6"
    }

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    }

    console.log(currentValue);

    return (
        <div style={styles.container}>
            <h2> Rate movie </h2>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={28}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            color={(hoverValue || currentValue || props.movie) > index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default RateMovie;