import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import Carousel from 'react-bootstrap/Carousel';
import { Carousel } from 'react-responsive-carousel';
import { connect } from "react-redux";
import { loadMovies, loadMoviesFavories, loadMoviesRandom, loadOneMovieById } from '../../actions/movie/movieAction';
import './caroussel.css'
import { Button, Card } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';

function Slider(props) {
    console.log("🚀 ~ file: carrousel.js:8 ~ Slider ~ props:", props)
    console.log("🚀 ~ file: carrousel.js:8 ~ Slider ~ props:", props.movies.movies)
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { movies } = props;

  
    
    useEffect(() => {
        try {
            props.loadMoviesRandom();
            setMovie(movies)
            setTimeout(()=> {

                setIsLoading(false);
            }, 2000)

        } catch (error) {
            setError(error);
            setIsLoading(false);

        }
    }, [])

  
    if (isLoading) {
        return <div>Loading caroussel...</div>
    }

    if (error) {
        return <div>Error : {error.message}</div>
    }


    
    console.log("🚀 ~ file: carrousel.js:15 ~ Slider ~ movies:", movies)

    return (

        <Carousel 
        className='carousel'
            autoPlay 
            interval={6000} 
            infiniteLoop
            showStatus={false} 
            showThumbs={false}
            showArrows={true}
        >
            {movies.movies.map((m, i) => (
            <div className="card_container" key={i}>
            <div className="card_bootstrap" style={{ width: '30rem', margin: 'auto' }}>
                <div
                className="card_bootstrap_img"
                // src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture}
                 
                />
                <img src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture}/>
                <div>
                    <h5>{m.title}</h5>
                    <p>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </p>
                    <button className="card_bootstrap_button" variant="primary">Go somewhere</button>
                </div>
            </div>
            </div>
            // <Carousel.Item>
            //   <img
            //     className="d-block w-50"
            //     src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + m.picture}
            //     alt="First slide"
            //   />
            //   <Carousel.Caption>
            //     <h3>{m.title}</h3>
            //     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            //   </Carousel.Caption>
            // </Carousel.Item>
            
            ))}
        </Carousel>
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
    loadMoviesRandom
}


export default connect(mapStateToProps, mapDispatchToProps)(Slider)

