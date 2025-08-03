import "modern-normalize/modern-normalize.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid.tsx"
import {useState} from "react";
import type {Movie} from "../../types/movie";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService"; 


export default function App(){
    const [movies,setMovies]=useState<Movie[]>([]);
    const[isLoading,setIsLoading]=useState(false);
    const[isError,setIsError]=useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch= async(query:string)=>{
        setMovies([]);
        setIsLoading(true);
        setIsError(false);

try{
        const results=await fetchMovies(query);
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


    const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    };

    const closeModal=()=>{
    setSelectedMovie(null);
    };
    return (
        <>
        <SearchBar onSubmit={handleSearch}/>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && <MovieGrid onSelect={handleSelect} movies={movies} />}
        { selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
        )}
  </>
);
}