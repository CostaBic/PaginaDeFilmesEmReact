import { useState, useEffect } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// Sugestões iniciais (já no formato esperado pelo MovieCard)
const sugestoes = [
  { id: 21, title: "Guardians of the Galaxy", poster_path: "https://image.tmdb.org/t/p/w200/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg" }, // substitui id:1
  { id: 2, title: "The Dark Knight", poster_path: "https://image.tmdb.org/t/p/w200/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg" },
  { id: 3, title: "Interstellar", poster_path: "https://image.tmdb.org/t/p/w200/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
  { id: 4, title: "Avengers: Endgame", poster_path: "https://image.tmdb.org/t/p/w200/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
  { id: 27, title: "Aquaman", poster_path: "https://image.tmdb.org/t/p/w200/xLPffWMhMj1l50ND3KchMjYoKmE.jpg" },
  { id: 6, title: "Forrest Gump", poster_path: "https://image.tmdb.org/t/p/w200/saHP97rTPS5eLmrLQEcANmKrsFl.jpg" },
  { id: 7, title: "The Matrix", poster_path: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: 8, title: "Gladiator", poster_path: "https://image.tmdb.org/t/p/w200/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" },
  { id: 23, title: "Black Panther", poster_path: "https://image.tmdb.org/t/p/w200/uxzzxijgPIY7slzFvMotPv8wjKA.jpg" }, // substitui id:9
  { id: 10, title: "The Lion King", poster_path: "https://image.tmdb.org/t/p/w200/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg" },
  { id: 11, title: "The Godfather", poster_path: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 12, title: "Pulp Fiction", poster_path: "https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 13, title: "The Shawshank Redemption", poster_path: "https://image.tmdb.org/t/p/w200/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id: 29, title: "Thor: Ragnarok", poster_path: "https://image.tmdb.org/t/p/w200/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg" },
  { id: 15, title: "The Avengers", poster_path: "https://image.tmdb.org/t/p/w200/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
  { id: 16, title: "Iron Man", poster_path: "https://image.tmdb.org/t/p/w200/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" },
  { id: 17, title: "Spider-Man", poster_path: "https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
  { id: 25, title: "Captain Marvel", poster_path: "https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg" }, // substitui id:18
  { id: 19, title: "The Lord of the Rings: The Fellowship of the Ring", poster_path: "https://image.tmdb.org/t/p/w200/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id: 20, title: "Harry Potter and the Sorcerer's Stone", poster_path: "https://image.tmdb.org/t/p/w200/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg" }
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(sugestoes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estado de favoritos
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Buscar filmes quando o usuário digita algo
  useEffect(() => {
    if (!query.trim()) return; // não faz nada se query está vazia

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/search/movie", { params: { query, page } });
        if (response.data.results.length === 0) {
          setError("Filme não encontrado.");
        }
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError("Erro ao buscar filmes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  // Submeter busca
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    if (!searchValue) {
      setError("Nenhum filme digitado.");
      setMovies(sugestoes); // voltar para sugestões
      return;
    }
    setError("");
    setQuery(searchValue);
    setPage(1);
  };

  // Adicionar/remover favoritos
  const toggleFavorite = (movie) => {
    let updated;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updated = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updated = [...favorites, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <header>
        <h1>Bem vindo ao Info Filmes</h1>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Digite um filme..." />
          <button type="submit">Buscar</button>
        </form>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
      </header>

      <main>
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </main>
    </div>
  );
}

export default SearchPage;
