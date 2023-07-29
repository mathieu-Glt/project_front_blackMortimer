import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { handleStorage } from "../../utils/handleStorage";
import { connect } from 'react-redux';
import './delete.css';
import requests from "../../services/api/request";


const Delete = (props) => {
    console.log("🚀 ~ file: delete.js:9 ~ Delete ~ props:", props)
    const params = useParams();
    console.log(params);
    const id = params.id;
    const location = useLocation();
    console.log("🚀 ~ file: delete.js:17 ~ Delete ~ location:", location)
    const queryParameters = new URLSearchParams(window.location.search)
    console.log("🚀 ~ file: delete.js:19 ~ Delete ~ queryParameters:", queryParameters)
    const pathnameUrl = location.pathname
    console.log("🚀 ~ file: delete.js:21 ~ Delete ~ pathnameUrl:", pathnameUrl)
    const [isAdmin, setIsAdmin] = useState(false);

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

    
    const HandleDelete = (e) => {
        e.preventDefault();
        console.log("Je suis dans le handleDelete");
        // console.log("L' id du film ou du personnage : ", id);
        const index = pathnameUrl.lastIndexOf("/")
        // console.log("🚀 ~ file: delete.js:53 ~ HandleDelete ~ index:", index)
        const url = pathnameUrl.substring(0, index)
        console.log("🚀 ~ file: delete.js:55 ~ HandleDelete ~ url:", url)
        if (url === '/movie') {
            console.log("L'url est bien /movie ");
            axios.delete(requests.deleteMovieDatabase + id , {
                headers: {
                    "x-access-token": localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                console.log("🚀 ~ file: delete.js:64 ~ .then ~ response:", response)
                setTimeout(() => {
                    window.location.href = "/acceuil"
                }, 5000)
            })
            .catch((error) => {
                console.log("🚀 ~ file: delete.js:67 ~ HandleDelete ~ error:", error)
                
            })
        } else {
            console.log("L'url est différente ");
            axios.delete(requests.deleteCharacterDatabase + id , {
                headers: {
                    "x-access-token": localStorage.getItem('access_token') 
                }
            })
            .then((response) => {
                console.log("🚀 ~ file: delete.js:64 ~ .then ~ response:", response)
                setTimeout(() => {
                    window.location.href = "/characters"
                }, 5000)
            })
            .catch((error) => {
                console.log("🚀 ~ file: delete.js:67 ~ HandleDelete ~ error:", error)
                
            })



        }

    }




    return (
        <>
            <button type='button' className="btn_supprimer" onClick={HandleDelete}>Supprimer</button>
        </>
    )



}


const mapStateToProps = store => {
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
    

}




export default connect(mapStateToProps, mapDispatchToProps)(Delete)

