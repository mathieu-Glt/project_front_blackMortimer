import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';
import { loadOneCharacterById } from '../../actions/character/characterActions';
import Delete from '../../components/Delete/delete';
import { handleStorage } from '../../utils/handleStorage';



const CharacterId = (props) => {
    console.log("🚀 ~ file: characterById.js:9 ~ CharacterId ~ props:", props)
    const params = useParams();
    console.log(params);
    const id = params.id;

    const [isAdmin, setIsAdmin] = useState(false);



    const data = props.characters.characters;

    useEffect(() => {
        props.loadOneCharacterById(id)
    }, [])


    useEffect(() => {
        async function fetchDataUser() {
            try {
                const user = await handleStorage();
                console.log("🚀 ~ file: nav.js:7 ~ handleStorage ~ user:", user.roles)
                const roles = user.roles;
                for (const role of roles) {
                    if (role === "ROLE_ADMIN") {
                        console.log(role);
                        setIsAdmin(!isAdmin)
                    }
                }

            } catch (error) {
                console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)

            }
        }

        fetchDataUser()

    }, [id])

    console.log("🚀 ~ file: EditMovie.js:17 ~ EditMovie ~ isAdmin:", isAdmin)
    async function  addCharacterBasket(data) {
        console.log("🚀 ~ file: characterById.js:53 ~ addCharacterBasket ~ data:", data)
        
    let characterRegistredInLocalStorage = JSON.parse(localStorage.getItem("character"))
        
    if (characterRegistredInLocalStorage) {

        characterRegistredInLocalStorage.push(data)
        localStorage.setItem("character", JSON.stringify(characterRegistredInLocalStorage))

    } else {
        characterRegistredInLocalStorage = [];
        characterRegistredInLocalStorage.push(data)
        localStorage.setItem("character", JSON.stringify(characterRegistredInLocalStorage))
        
    }

    
    
    
    
}



    return (
        <>
            <h3>Détails du personnage</h3>
            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">
                {console.log("Les datas de characterbyid : ", data)}
                <div className="card_movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center">
                    <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/charcter/' + data.picture} />
                    </div>
                    <p>{data.firstname}</p>
                    <p>{data.lastname}</p>
                    <p>{data.occupation}</p>
                    <p>{data.information}</p>
                    <div className='container_buttons'>
                        <Link to={`/editcharacter/${data.id}`}>
                            <button type='button' className='card_button_acceuil_edit'>
                                Editer 
                            </button>
                        </Link>
                        {isAdmin ? <Delete /> : null}
                        <button className=" btn btn-danger " onClick={() => addCharacterBasket(data)}>
                            Pannier
                        </button>


                    </div>
                </div>

            </section>

        </>
    )
}

const mapStateToProps = store => {
    console.log({ store });
    return {
        movies: store.movies,
        characters: store.characters
    }
}

const mapDispatchToProps = {

    loadOneCharacterById

}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterId)