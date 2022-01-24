import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import '../../firebase'
import './Movie.css'

const IMG_API = "https://image.tmdb.org/t/p/w1280"

//This component is for our individual movies
const Movie = ({id, title, poster_path, overview, listType, addTo, remove}) => {
    const [readMore, setRead] = useState(false);
    
    //Returns individual movie component
    return (
        <div className="movie">
            <img src={ IMG_API + poster_path}/>
            <div className="movie-info">
                <h5>{title}</h5>
                <p>{readMore ? overview : `${overview.substring(0, 100)} ...`}
                    <button onClick={()=>{setRead(!readMore)}}>
                        {readMore ? 'show less' : 'read more'}
                    </button>
                </p>
            </div>
            {listType ?
                <Button className="w-75 btn-dark" onClick={() => addTo({id, title, poster_path, overview})}>Add To Watch List</Button>
                :
                <Button className="w-75 btn-dark" onClick={() => remove({id})}>Remove From Watch List</Button>
            }
        </div>
    )
}

export default Movie
