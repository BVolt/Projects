import React, {useState, useEffect, useRef} from 'react'
import firebase from 'firebase/compat/app'
import Movie from './Movie'
import {doc, getDoc} from "firebase/firestore"
import './Movies.css'
import {useAuth} from './Authentication/Authorization'
import { render } from '@testing-library/react'

const MyList = () => {
    const watchList = useRef([]) 
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const {currentUser} = useAuth()
    const [error, setError] = useState()
  
    const fetchwatchList = async() => {
      const db = firebase.firestore();
      const docRef = db.collection('Lists').doc(`${currentUser.email}`)
  
      setLoading(true) 
      try{
        const docSnap = await docRef.get()
        setLoading(false) 
        setMovies(docSnap.data().watchList)
      }catch{
        setLoading(false)
      }
    }

    const remove= async({id}) => {  
      watchList.current = movies
      const newList = watchList.current.filter((movie)=> movie.id !== id)
      watchList.current = newList
      setMovies(newList)
      
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
      fetchwatchList()
      console.log(1)
  }, [])  
 
    return (
      <>
      <div className="browse-container">
        {movies.map((movie)=>(
          <Movie key={movie.id} {...movie} listType={false} remove={remove} />
        ))}
      </div>
      </>
    )
}

export default MyList
