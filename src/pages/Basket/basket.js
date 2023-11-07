import React, { useEffect, useState } from 'react';
import './basket.css';
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext';
import axios from 'axios';
import requests from '../../services/api/request';
import RateMovie from '../../components/RateMovie/ratemovie';
import FavoriteHeart from '../../components/FavoriteHeart/favoriteheart';
import { useLocalStorage } from '../../utils/useLocalStorage.ts';
import { loadBasket } from '../../actions/basket/basketActions';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Basket = (props) => {
    const navigate = useNavigate();

    console.log("🚀 ~ file: basket.js:16 ~ Basket ~ props:", props)
    const { theme, toggleTheme, themeApp } = useContext(ThemeContext)
    const { basket } = props.basket.basket
    const [perso, setPerso] = useState(null)
    const basketLocalStorage = localStorage.getItem("character")
    const characters = JSON.parse(basketLocalStorage)
    console.log("🚀 ~ file: basket.js:23 ~ Basket ~ characters:", characters)
    console.log("🚀 ~ file: basket.js:22 ~ Basket ~ basket:", basket)
    
    
    function handleDeleteBasketStorage(id) {
        console.log("🚀 ~ file: basket.js:28 ~ Basket ~ basketLocalStorage:", characters)
        console.log("🚀 ~ file: basket.js:29 ~ handleDeleteBasketStorage ~ id:", id)

        const updateBasketStorage = characters.filter(item => item.id !== id)
        console.log("🚀 ~ file: basket.js:32 ~ handleDeleteBasketStorage ~ updateBasketStorage:", updateBasketStorage)

        localStorage.setItem("character", JSON.stringify(updateBasketStorage))

        setTimeout(() => {
            window.location.href = "/basket"
        }, 2000)
        
    }
    
    useEffect(() => {
        try {
            if (basket === undefined) {
                const basketLocalStorage = localStorage.getItem("character")
            } else {
                props.loadBasket();
                
            }
            
        } catch (error) {
            console.log("🚀 ~ file: basket.js:27 ~ useEffect ~ error:", error)
        }
    }, [])
    
    return (
        <>
            <h2 className='title_page_character'>Pannier </h2>
            <section className={`${themeApp ? 'card_movies_light d-flex flex-row flex-wrap justify-content-center p-4 pt-4' : 'card_movie_dark d-flex flex-row flex-wrap justify-content-center p-4 pt-4'}`}>

                {basket === undefined ? (
                    // Si le tableau basket contient des éléments
                    characters.map((b, i) => (
                        <div className='card_movie_container' key={i}>
                            <div className="image ">
                                <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + b.picture} />
                            </div>
                            <p>{b.information.substring(0, 189)}...</p>
                            <Link to={`/character/${b.id}`}>
                                <button className="card_button_character ">
                                    Plus
                                </button>

                            </Link>
                            <button type='button' className="btn btn-danger " onClick={() =>handleDeleteBasketStorage(b.id)}>
                                    supprimer 
                            </button>



                        </div>

                    ))
                ) : (
                    // Si le tableau basket est vide
                    // Si le tableau basket contient des éléments
                    basket.map((b, i) => (
                        <div className='card_movie_container' key={i}>
                            <div className="image ">
                                <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + b.picture} />
                            </div>
                            <p>{b.information.substring(0, 189)}...</p>
                            <Link to={`/character/${b.id}`}>
                                <button className="card_button_character ">
                                    Plus
                                </button>
                                <button type='button' className="btn btn-danger " onClick={handleDeleteBasketStorage(b.id)}>
                                    supprimer 
                            </button>

                            </Link>

                        </div>

                    ))

                )}

            </section>


        </>
    )

}

const mapStateToProps = store => {
    console.log({ store });
    return {
        basket: store.basket
    }
}

const mapDispatchToProps = {
    loadBasket

}


export default connect(mapStateToProps)(Basket)