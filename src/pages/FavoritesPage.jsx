import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return <p>Você não tem filmes favoritos.</p>;
  }

  return (
    <div>

      <header>
          <h1>Meus Favoritos</h1>
      </header>

      <div className="movie-grid">
        {favorites.map((fav) => {
          const posterUrl = fav.poster_path
            ? `https://image.tmdb.org/t/p/w200${fav.poster_path}`
            : "https://via.placeholder.com/200x300?text=Sem+Imagem";

          return (
            <div key={fav.id} className="movie-card">
              <img src={posterUrl} alt={fav.title} />
              <h3>{fav.title}</h3>
              <div style={{ display: "flex", gap: "5px" }}>
                <Link to={`/details/${fav.id}`}>
                  <button>Detalhes</button>
                </Link>
                <button onClick={() => removeFavorite(fav.id)}>Remover</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesPage;
