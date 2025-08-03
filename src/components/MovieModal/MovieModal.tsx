import css from "./MovieModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";

interface ModalProps{
    onClose:()=>void;
     movie: Movie;
}

export default function MovieModal({onClose,movie}:ModalProps){
    const handleBackdropClick=(event:React.MouseEvent<HTMLDivElement>)=>{
        if (event.target===event.currentTarget){
            onClose()
        }
    };
useEffect(()=>{
    const handleKeyDown=(e:KeyboardEvent)=>{
        if (e.key==="Escape"){
            onClose();
        }
    };
    document.addEventListener("keydown",handleKeyDown);
    document.body.style.overflow="hidden";
    return()=>{
        document.removeEventListener("keydown",handleKeyDown);
        document.body.style.overflow="";
    };
},[onClose]);

return createPortal(
    <div className={css.backdrop}
    onClick={handleBackdropClick}
    role="dialog"
    aria-modal="true">
        <div className={css.modal}>
    
    <button className={css.closeButton}
    onClick={onClose}
    aria-label="close modal">
        &times;
    </button>
 <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
          <p>Release: {movie.release_date}</p>
</div>
</div>
</div>,
document.body);

}; 