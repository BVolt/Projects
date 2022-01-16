import React, {useState, useEffect, useRef, useReducer} from 'react'
import Movie from './Movie'
import './Movies.css'
import firebase from 'firebase/compat/app'
import {useAuth} from './Authentication/Authorization'
import {Button, Card, Container} from 'react-bootstrap'


function reducer(category, action) {
  switch(action.type){
    case "popular":
      category = "popular";
      console.log(4);
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

const Browse = () => {
  const [movies, setMovies] = useState([])
  const watchList = useRef([])
  const [page, setPage] = useState(1);
  const {currentUser} = useAuth();
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [category, dispatch] = useReducer(reducer, "now_playing")
  const [query, setQuery] = useState("")

  const fetchMovies = async () =>{
    if(query){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=5110138151f5d7b0b102331be17da8fd&language=en-US&page=${page}&query=${query}`)
      .then(res=>res.json())
      .then(data =>{
        setMovies(data.results)
      })
      setQuery("")
    }
    else{
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=5110138151f5d7b0b102331be17da8fd&language=en-US&page=${page}`)
    .then(res=>res.json())
    .then(data =>{
      setMovies(data.results)
    })
  }
}

  const fetchwatchList = async() => {
    const db = firebase.firestore();
    const docRef = db.collection('Lists').doc(`${currentUser.email}`)

    setLoading(true)
    try{
      const docSnap = await docRef.get()
      setLoading(false)
      watchList.current = docSnap.data().watchList
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }


  const addTo = async ({ id, title, poster_path, overview}) => {
    setLoading(true)
    if (watchList.current.some(movies => movies.id === id)){
      alert('Movie already on your watch list!')
      return
    }
    watchList.current = ([...watchList.current, {
      id: id,
      title: title,
      poster_path: poster_path,
      overview: overview
    }])
    
    try{
        const docRef= await firebase
        .firestore()
        .collection("Lists")
        .doc(`${currentUser.email}`)
        .set({watchList:[...watchList.current] 
        });
        }catch(e){
            setError("failed to update")
            setLoading (false)
            console.log(1)
        }
}

useEffect(()=>{
  fetchMovies()
  fetchwatchList()
},[page, category])

  return (
    <>
      <div className="browse-options">
      <Button  className="btn-dark" onClick={() =>{dispatch({type: "popular"});fetchMovies();setPage(1)}}>Popular</Button>
      <Button  className="btn-dark" onClick={() =>{dispatch({type: "now_playing"});fetchMovies();setPage(1)}}>Now Playing</Button>
      <Button className="btn-dark"  onClick={() =>{dispatch({type: "top_rated"});fetchMovies();setPage(1)}}>Top Rated</Button>
      <Button className="btn-dark"  onClick={() =>{dispatch({type: "upcoming"});fetchMovies();setPage(1)}}>Upcoming</Button>
      </div>
      <div className="browse-options">
      <form onSubmit={(e) =>{e.preventDefault();fetchMovies()}}>
          <input className= "search"type="text" placeholder="search" value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
        </form>
      </div>
      <div className="browse-container">
        {movies.map((movie)=>(
          <Movie key={movie.id} {...movie} listType={true} addTo={addTo}/>
        ))}
      </div>
      <Container className="page" >
        <Card style={{maxWidth: "200px"}}>
          <Card.Body className="card-body">
                  <div className="page-child">
            <Button className="btn-info" onClick={()=>setPage(currPage => currPage - 1)}>-</Button>
            </div>
          <div className="page-child">
            <h1>{page}</h1>
            </div>
            <div className="page-child">
            <Button className="btn-info"  onClick={()=>setPage(currPage => currPage + 1)}>+</Button>
          </div>
          </Card.Body> 
        </Card>
      </Container>
    </>
  )
}

export default Browse
