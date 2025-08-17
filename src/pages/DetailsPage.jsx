import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError("Não foi possível buscar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return; // evita erro se movie ainda não carregou

    let updated;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updated = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updated = [
        ...favorites,
        { id: movie.id, title: movie.title, poster_path: movie.poster_path }
      ];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=Sem+Imagem";

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={posterUrl} alt={movie.title} />

      <p><strong>Diretor:</strong> {movie.production_companies?.map(c => c.name).join(", ")}</p>
      <p><strong>Elenco:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
      <p><strong>Sinopse:</strong> {movie.overview}</p>
      <p><strong>Avaliação:</strong> {movie.vote_average}</p>

      <button onClick={toggleFavorite}>
        {favorites.some((fav) => fav.id === movie.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}

export default DetailsPage;
