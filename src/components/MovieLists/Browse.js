import React, {useContext, useState, useEffect, useRef, useReducer, useCallback} from 'react'
import Movie from '../Movie/Movie'
import './MovieList.css'
import firebase from 'firebase/app'
import {Authorization} from '../Authentication/Authorization'
import {Button, Alert} from 'react-bootstrap'

//Reducer takes in button click from category selection and assigns cattegory based on button pressed.
function reducer(category, action) {
  switch(action.type){
    case "popular":
      category = "popular";
      return category;
    case "now_playing":
      category = "now_playing";
      return category;
    case "top_rated":
      category = "top_rated";
      return category;
    case "upcoming":
      category = "upcoming";
      return category;
    default:
      category = "now_playing" 
      return category;  
  }
}

//This Browser component is our route that renders API data 
const Browse = () => {
  const watchList = useRef([])
  const {currentUser} = useContext(Authorization)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1);
  const [error, setError] = useState()
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(false)
  const [category, dispatch] = useReducer(reducer, "now_playing")
  const [query, setQuery] = useState("")

  //Fetches our movie data from API by either the state of the category or search query.
  const fetchMovies = () =>{

    setLoading(true)
    setError("")
    if(query){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=5110138151f5d7b0b102331be17da8fd&language=en-US&include_adult=false&page=${page}&query=${query}`)
      .then(res=>res.json())
      .then(data =>{
        setMovies(data.results)
        setLoading(false)
      }).catch(e=>{
        setError("Search Query Failed")
      })
      setQuery("")
    }
    else{
      fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=5110138151f5d7b0b102331be17da8fd&language=en-US&include_adult=false&page=${page}`)
      .then(res=>res.json())
      .then(data =>{
        setMovies(data.results)
        setLoading(false)
        }).catch(e=>{
          setError("Cannot fetch movies from database")
        })
    }
  }

  //Fetches current users watchlist from firebase so that it may be added to
  const fetchwatchList = async() => {
    const docRef = firebase.firestore().collection('Lists').doc(`${currentUser.email}`)

    setLoading(true)
    setError("")
    try{
      const docSnap = await docRef.get()
      watchList.current = docSnap.data().watchList
      setLoading(false)
    }catch(e){
      setLoading(false) 
    }
  }

  //adds the movies that is clicked to the current users watch list
  const addTo = async ({ id, title, poster_path, overview}) => {

    if (watchList.current.some(movies => movies.id === id)){
      setError('Movie already on your watch list!')
      setTimeout(()=>{
          setError('')
      }, 3000)
      return
    }
    watchList.current = ([...watchList.current, {
      id: id,
      title: title,
      poster_path: poster_path,
      overview: overview
    }])
    
    try{
        setError("")
        const docRef= await firebase
        .firestore()
        .collection("Lists")
        .doc(`${currentUser.email}`)
        .set({watchList:[...watchList.current]});
        setNotification(`${title} added to your watch list`)
        setTimeout(()=>{
            setNotification('')
        }, 3000)
    }catch(e){
      setError("Failed to add movie")
      }
}

//Fetch Movies from TMDB and WatchList from firebase upon rendering component
//and when page or category change.
useEffect(()=>{
  fetchMovies()
  fetchwatchList()
},[page, category])

//Display loading state if loading is true
if(loading){
  return <div className="loading">
    <h1>Loading</h1>
    <img src={require("../../assets/tmdb.jpg")}/>
    </div>
}
//Render the Browse list as well as the category selection and search bar
else if (!loading){
  return (
    <>
      <div className="browse-options">
        <Button  className="btn-dark" onClick={() =>{dispatch({type: "popular"});fetchMovies();setPage(1)}}>Popular</Button>
        <Button className="btn-dark"  onClick={() =>{dispatch({type: "top_rated"});fetchMovies();setPage(1)}}>Top Rated</Button>
        <Button  className="btn-dark" onClick={() =>{dispatch({type: "now_playing"});fetchMovies();setPage(1)}}>Now Playing</Button>
        <Button className="btn-dark"  onClick={() =>{dispatch({type: "upcoming"});fetchMovies();setPage(1)}}>Upcoming</Button>
      </div>
      <div className="browse-options">
        <form onSubmit={(e) =>{e.preventDefault();fetchMovies()}}>
          <input className="search"type="text" placeholder="search" value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
        </form>
      </div>
      {notification && <Alert className="fixed-top">{notification}</Alert>}
      {error && <Alert className="fixed-top text-align-center"variant="danger">{error}</Alert>}
      <div className="browse-container">
        {movies.map((movie)=>(
          <Movie key={movie.id} {...movie} listType={true} addTo={addTo}/>
        ))}
      </div>
      <div className="page-increment" >
        <div className="increment-card">
            <button className="page-change" onClick={()=>setPage(currPage => currPage - 1)}>-</button>
            <h3>{page}</h3>
            <button className="page-change"  onClick={()=>setPage(currPage => currPage + 1)}>+</button>
        </div>
      </div>
    </>
  )
}
}

export default Browse
