import React, { useEffect, useState } from 'react';
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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


const Cart = (props) => {
    console.log("🚀 ~ file: cart.js:17 ~ Basket ~ props:", props)
    let index = 0;

    const { basket } = props
    // console.log("🚀 ~ file: cart.js:20 ~ Cart ~ basket:", basket.basket)
    // console.log("🚀 ~ file: cart.js:21 ~ Cart ~ basket:", basket.basket.length);

    useEffect(() => {
        try {
            props.loadBasket();

        } catch (error) {
            console.log("🚀 ~ file: cart.js:27 ~ useEffect ~ error:", error)
        }
    }, [])

    if(basket.basket === null) {
        basket.basket = index
    }
    // for (let i = 0; i < basket.length + 1; i++) {
    //     console.log("🚀 ~ file: cart.js:23 ~ Cart ~ i:", i)

    //     index = i;


    // }


    return (
        <>
            <div className='d-flex flex-row'>
                {/* {basket.map((b, i) => (
                ))} */}
                
                { basket.basket.length ? <h1 className='bg-white border rounded-circle p-1 text-dark'>{basket.basket.length}</h1>
                : <h1 className='bg-white border rounded-circle p-1 text-dark'>{index}</h1>
                 }
                <ShoppingBasketIcon />
                
            </div>

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


export default connect(mapStateToProps)(Cart)