import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <Link to={`/details/${movie.id}`}>
        <button>Detalhes</button>
      </Link>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}

export default MovieCard;

