import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
