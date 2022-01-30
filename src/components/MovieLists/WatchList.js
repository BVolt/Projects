import React, {useContext, useState, useEffect, useRef} from 'react'
import firebase from 'firebase/app'
import Movie from '../Movie/Movie'
import './MovieList.css'
import {Authorization} from '../Authentication/Authorization'
import {Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'

//This component displays the current users watch list
const MyList = () => {
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
        const idArray= docSnap.data().watchList
        await idArray.map(movie=>{
          fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=5110138151f5d7b0b102331be17da8fd&language=en-US&include_adult=false`)
          .then(res=>res.json())
          .then(data=>{
            setMovies((currMovies)=>{ 
              if (currMovies.some(movie=> movie.id === data.id))
                return currMovies 
              else {
                return [...currMovies, {
                id: data.id,
                title: data.title,
                poster_path: data.poster_path,
                overview: data.overview
            }]}}) 
          })
        })
        setLoading(false) 
      }catch{
        setError("Failed to fetch watch list")
        setLoading(false)
      }
    }

    //This function removes a movie from the current watch list
    const remove= async({id}) => {  
      const newList = movies.filter((movie)=> movie.id !== id)
      setMovies(newList)
      
      setError("")
      setLoading(true) 
      try{
        const docRef= await firebase
        .firestore()
        .collection("Lists")
        .doc(`${currentUser.email}`)
        .set({watchList:newList.map(movie=>movie.id) 
        });
        setLoading(false)
        }catch(e){
            setError("Failed to remove")
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
