import React, {useContext, useState, useEffect, useRef} from 'react'
import firebase from 'firebase/app'
import Movie from '../Movie/Movie'
import './MovieList.css'
import {Authorization} from '../Authentication/Authorization'
import {Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Browse from './Browse'

//This component displays the current users watch list
const MyList = () => {
    const watchList = useRef([]) 
    const {currentUser} = useContext(Authorization)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
  
    //This function fetches our current users watch list
    const fetchwatchList = async() => {
      const docRef = firebase.firestore().collection('Lists').doc(`${currentUser.email}`)
      
      setError("")
      setLoading(true) 
      try{
        const docSnap = await docRef.get()
        setMovies(docSnap.data().watchList)
        setLoading(false) 
      }catch{
        setError("Failed to fetch watch list")
        setLoading(false)
      }
    }

    //This function removes a movie from the current watch list
    const remove= async({id}) => {  
      watchList.current = movies
      const newList = watchList.current.filter((movie)=> movie.id !== id)
      watchList.current = newList
      setMovies(newList)
      
      setError("")
      setLoading(true)
      try{
        const docRef= await firebase
        .firestore()
        .collection("Lists")
        .doc(`${currentUser.email}`)
        .set({watchList:[...watchList.current] 
        });
        setLoading(false)
        }catch(e){
            setError("Failed to update porfile")
            setLoading (false)
        }

    }

  //Fetches watch list on component render
  useEffect(()=>{     
      fetchwatchList()
  }, [])  

    //conditional loading screen
    if(loading){
      return <div className="loading">
        <h1>Loading</h1>
        </div>
    }
    //If list is empty
    else if(!loading && movies.length === 0){
      return <div className="empty-list">
        <h1>Your Watch List is Empty!</h1>
        <h2><Link to="/Browse">Browse for movies to add.</Link></h2>
      </div>
    }
    //.map to display watch list
    else if (!loading){
    return (
      <>
      {error && <Alert className="w-25 fixed-top"variant="danger">{error}</Alert>}
      <div className="browse-container">
        {movies.map((movie)=>(
          <Movie key={movie.id} {...movie} listType={false} remove={remove} />
        ))}
      </div>
      </>
    )
  }
}

export default MyList
