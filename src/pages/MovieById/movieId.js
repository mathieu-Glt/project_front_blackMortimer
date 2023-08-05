import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadOneMovieById } from '../../actions/movie/movieAction';
import { connect } from 'react-redux';
import { handleStorage } from '../../utils/handleStorage';
import Delete from '../../components/Delete/delete';
import requests from '../../services/api/request';
import { useApi } from '../../services/AxiosInstance/useApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const MovieId = (props) => {
    const params = useParams();
    console.log(params);
    const id = params.id;
    const api = useApi();
    const navigate = useNavigate();


    console.log("Les props de movieById : ", props);
    const data = props.movies.movies;
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const [error, setError] = useState("");
    const [commentsData, setCommentsData] = useState([]);

    const [comment, setComment] = useState({
        comment: ""
    });


    useEffect(() => {
        props.myActionWithPram(id)
    }, [])


    function handleChange(evt) {
        console.log(evt);
        const { name, value } = evt.target
        console.log("🚀 ~ file: movieId.js:30 ~ handleChange ~ value:", value)
        setComment({ ...comment, [name]: value })
    }

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
                const comments = await api.get(requests.fetchCommentsToUser + id);
                console.log("🚀 ~ file: movieId.js:57 ~ fetchDataUser ~ comments:", comments)
                if (comments.status == 200) {
                    setCommentsData(comments.data.message)
                }
            } catch (error) {
                console.log("🚀 ~ file: nav.js:39 ~ handleStorage ~ error:", error)

            }
        }

        fetchDataUser()

    }, [id])

    console.log("🚀 ~ file: EditMovie.js:17 ~ EditMovie ~ isAdmin:", isAdmin)

    async function postComments(comment, id) {
        console.log("🚀 ~ file: movieId.js:60 ~ postComments ~ comment:", comment)
        console.log("🚀 ~ file: movieId.js:60 ~ postComments ~ id:", id)
        console.log('je uis ds le postComments');
        const postComment = await api.post(requests.postComment + id, comment)
        console.log("🚀 ~ file: movieId.js:69 ~ postComments ~ postComment:", postComment)
        if (postComment.status === 200) {
            toast.success(postComment.data.message, { type: "success", theme: "colored", autoClose: 5000 })
            setTimeout(() => {

                navigate('/acceuil')
            }, 5000)

        } else {
            toast.error(error.data.message, { type: "error", theme: "colored", autoClose: 5000 })

        }

    }

    function HasClickedForAddComment(e) {
        e.preventDefault()
        setHasClicked(true);
        if (hasClicked === true) {
            setHasClicked(false);
        } else {
            setHasClicked(true);
        }

    }

    function handleSubmit(e, id) {
        e.preventDefault();
        console.log("Je suis dans le handlesubmit");
        console.log("🚀 ~ file: movieId.js:71 ~ handleSubmit ~ id:", id)
        console.log("🚀 ~ file: movieId.js:73 ~ MovieId ~ comment:", comment)

        if (comment.comment === "") {
            console.log("condition 1");
            setError("Tous les champs ne sont pas remplis")

        } else {
            console.log("condition 2");
            postComments(comment, id);
        }
    }

    console.log("🚀 ~ file: movieId.js:121 ~ MovieId ~ commentsData:", commentsData)

    return (
        <div>
            <h2>Détails du film</h2>
            <section className="card_movie d-flex flex-column flex-wrap justify-content-center p-4 pt-4">
                {console.log("Les datas de moviebyid : ", data)}
                <div className="card_movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center">
                    <div className="image ">
                        <img className="image_database_acceuil" alt="B&M" src={process.env.PUBLIC_URL + '/images/black&Mortimer/' + data.picture} />
                    </div>
                    <p>{data.synopsis}</p>
                    <div className='container_buttons'>
                        {isAdmin ? <Link to={`/editmovie/${data.id}`}>
                            <button type='button' className='card_button_acceuil_edit'>
                                Editer
                            </button>
                        </Link> : null}
                        {isAdmin ? <Delete /> : null}

                    </div>
                </div>
                <button type='button' className='btn btn-info' onClick={(e) => HasClickedForAddComment(e)}>Ajouter un commentaire</button>
                {hasClicked ? <form onSubmit={(evt) => handleSubmit(evt, id)} encType="multipart/form-data">

                    <h2>Formulaire pour ajouter un commentaire</h2>
                    <label htmlFor="comment">Entrer votre commentaire :</label>
                    <input
                        type="text"
                        className="form-control"
                        id="comment"
                        name="comment"
                        value={comment.comment}
                        placeholder="exemple: that movie is nice"
                        onChange={(evt) => handleChange(evt)}
                    />
                    <br></br>
                    <input
                        type="submit"
                        value="Valider le formulaire"
                        className="btn btn-primary"
                    />
                </form> : null}
                <h2>Commentaires :</h2>
                {commentsData.map((c, i) => (
                    <div className='card_movie_container' key={i}>
                        <p>{c.comment}</p>
                        <p>{c.firstname}</p>
                        <p>{c.lastname}</p>
                    </div>

                ))}




            </section>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        movies: store.movies
    }
}

const mapDispatchToProps = (dispatch) => {
    const myActionWithPram = (id) => {
        dispatch(loadOneMovieById(id))
    }

    return {
        myActionWithPram,
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieId)

