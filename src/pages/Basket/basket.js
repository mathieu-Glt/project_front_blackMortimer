import React, { useEffect, useState } from 'react';
import './basket.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useContext } from 'react'
import { ThemeContext } from '../../context/index';
import axios from 'axios';
import requests from '../../services/api/request';
import RateMovie from '../../components/RateMovie/ratemovie';
import FavoriteHeart from '../../components/FavoriteHeart/favoriteheart';
import { useLocalStorage } from '../../utils/useLocalStorage.ts';
import { loadBasket } from '../../actions/basket/basketActions';


const Basket = (props) => {
console.log("🚀 ~ file: basket.js:16 ~ Basket ~ props:", props)


    useEffect(() => {
        try {
            props.loadBasket();
            
        } catch (error) {
        console.log("🚀 ~ file: basket.js:27 ~ useEffect ~ error:", error)
        }
    }, [])

    return (
        <>
            <h2 className='title_page_character'>Pannier </h2>

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