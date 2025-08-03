import axios from "axios";
import "modern-normalize/modern-normalize.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid.tsx"
import {useState} from "react";
import type {Movie} from "../../types/movie";
import Loader from "../Loader/Loader.tsx";
import Error from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService"; 


export default function App(){
    const [movies,setMovies]=useState<Movie[]>([]);
    const[isLoading,setIsLoading]=useState(false);
    const[isError,setIsError]=useState(false);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch= async(query:string)=>{
        setMovies([]);
        setIsLoading(true);
        setIsError(false);

        try{
         const results = await fetchMovies(query);
        console.log("handleSearch:",query);
        
        const response=await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`,{method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }});
        console.log(response.data);

    if (results.length === 0){
        toast.error("No movies found for your request.");
        return;
    }
    setMovies(results);
}catch{
    setIsError(true);
}finally{
    setIsLoading(false);
}
    };


   const handleSelect = (movieId: number) => {
  const found = movies.find(movie => movie.id === movieId);
  if (found) {
    setSelectedMovie(found);
    setIsModalOpen(true);
  }
};

   
    const closeModal=()=>setIsModalOpen(false);

    return (
        <>
        <SearchBar onSearch={handleSearch}/>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <Error />}
        {!isLoading && !isError && <MovieGrid onSelect={handleSelect} movies={movies} />}
        
  
      {isModalOpen && selectedMovie && (
      <MovieModal onClose={closeModal} movie={selectedMovie} />
      
    )}
  </>
);
}