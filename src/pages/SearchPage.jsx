import { useState, useEffect } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// Sugestões iniciais (já no formato esperado pelo MovieCard)
const sugestoes = [
  { id: 118340, title: "Guardians of the Galaxy", poster_path: "/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg" },
  { id: 155, title: "The Dark Knight", poster_path: "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg" },
  { id: 157336, title: "Interstellar", poster_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
  { id: 299534, title: "Avengers: Endgame", poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
  { id: 297802, title: "Aquaman", poster_path: "/xLPffWMhMj1l50ND3KchMjYoKmE.jpg" },
  { id: 13, title: "Forrest Gump", poster_path: "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg" },
  { id: 603, title: "The Matrix", poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: 98, title: "Gladiator", poster_path: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" },
  { id: 284054, title: "Black Panther", poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg" },
  { id: 420818, title: "The Lion King", poster_path: "/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg" },
  { id: 238, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 680, title: "Pulp Fiction", poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 278, title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id: 284053, title: "Thor: Ragnarok", poster_path: "/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg" },
  { id: 24428, title: "The Avengers", poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
  { id: 1726, title: "Iron Man", poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" },
  { id: 557, title: "Spider-Man", poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
  { id: 299537, title: "Captain Marvel", poster_path: "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg" },
  { id: 120, title: "The Lord of the Rings: The Fellowship of the Ring", poster_path: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id: 671, title: "Harry Potter and the Sorcerer's Stone", poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg" }
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
  if (!query.trim()) return;

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/search/movie", { params: { query, page } });

      if (response.data.results.length === 0) {
        setError("Filme não encontrado.");
        setMovies(sugestoes); // mantém as sugestões
      } else {
        setMovies(response.data.results);
        setError("");
      }

      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Erro ao buscar filmes.");
      setMovies(sugestoes); // mantém sugestões caso dê erro
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
        {loading && <p className="message">Carregando...</p>}
        {error && <p className="message">{error}</p>}
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
