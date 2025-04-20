import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const GameContext = createContext();

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [library, setLibrary] = useState({
    collection: [],
    wishlist: [],
    completed: [],
  });

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const BASE_URL = "https://api.rawg.io/api";

  console.log("API Key:", API_KEY);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`);
      setGenres(response.data.results);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  }, [API_KEY]);

  const fetchPlatforms = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/platforms?key=${API_KEY}`);
      setPlatforms(response.data.results);
    } catch (err) {
      console.error("Error fetching platforms:", err);
    }
  }, [API_KEY]);

  const fetchGames = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/games?key=${API_KEY}&page=${pageNum}&page_size=20`;
      
      if (selectedGenre) {
        url += `&genres=${selectedGenre}`;
      }
      
      if (selectedPlatform) {
        url += `&platforms=${selectedPlatform}`;
      }
      
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await axios.get(url);

      if (pageNum === 1) {
        setGames(response.data.results);
      } else {
        setGames((prev) => [...prev, ...response.data.results]);
      }

      setHasMore(response.data.results.length === 20);
      setError(null);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError("Failed to fetch games");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, selectedGenre, selectedPlatform, searchQuery]);

  const searchGames = useCallback((query) => {
    setSearchQuery(query);
    setPage(1);
    setSelectedGenre(null);
    setSelectedPlatform(null);
    fetchGames(1);
  }, [fetchGames]);

  const selectGenre = useCallback((genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
    setSearchQuery("");
    fetchGames(1);
  }, [fetchGames]);

  const selectPlatform = useCallback((platformId) => {
    setSelectedPlatform(platformId);
    setPage(1);
    setSearchQuery("");
    fetchGames(1);
  }, [fetchGames]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage);
    }
  }, [page, loading, hasMore, fetchGames]);

  const getGameDetails = useCallback(async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching game details:', err);
      throw err;
    }
  }, [API_KEY]);

  const addToLibrary = (game, category) => {
    setLibrary((prev) => ({
      ...prev,
      [category]: [...prev[category], game],
    }));
  };

  const removeFromLibrary = (gameId, category) => {
    setLibrary((prev) => ({
      ...prev,
      [category]: prev[category].filter((game) => game.id !== gameId),
    }));
  };

  useEffect(() => {
    console.log("GameContext mounted, fetching initial games..."); // Debug log
    fetchGenres();
    fetchPlatforms();
  }, [fetchGenres, fetchPlatforms]);

  useEffect(() => {
    fetchGames(page);
  }, [fetchGames, page]);

  const value = {
    games,
    loading,
    error,
    library,
    genres,
    platforms,
    selectedGenre,
    selectedPlatform,
    hasMore,
    searchGames,
    selectGenre,
    selectPlatform,
    loadMore,
    getGameDetails,
    addToLibrary,
    removeFromLibrary,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
