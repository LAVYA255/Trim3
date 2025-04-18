import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [library, setLibrary] = useState({
    collection: [],
    wishlist: [],
    completed: []
  });

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const BASE_URL = 'https://api.rawg.io/api';

  console.log('API Key:', API_KEY); // Debug log

  const fetchGames = useCallback(async (pageNum = 1, search = '') => {
    try {
      setLoading(true);
      const url = search
        ? `${BASE_URL}/games?key=${API_KEY}&page=${pageNum}&page_size=20&search=${search}`
        : `${BASE_URL}/games?key=${API_KEY}&page=${pageNum}&page_size=20`;
      
      const response = await axios.get(url);
      
      if (pageNum === 1) {
        setGames(response.data.results);
      } else {
        setGames(prev => [...prev, ...response.data.results]);
      }
      
      setHasMore(response.data.results.length === 20);
      setError(null);
    } catch (err) {
      console.error('Error fetching games:', err); // Debug log
      setError('Failed to fetch games');
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  const searchGames = useCallback((query) => {
    setSearchQuery(query);
    setPage(1);
    fetchGames(1, query);
  }, [fetchGames]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage, searchQuery);
    }
  }, [page, loading, hasMore, fetchGames, searchQuery]);

  const fetchGameDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/games/${id}?key=${API_KEY}`
      );
      return response.data;
    } catch (err) {
      setError('Failed to fetch game details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addToLibrary = (game, category) => {
    setLibrary(prev => ({
      ...prev,
      [category]: [...prev[category], game]
    }));
  };

  const removeFromLibrary = (gameId, category) => {
    setLibrary(prev => ({
      ...prev,
      [category]: prev[category].filter(game => game.id !== gameId)
    }));
  };

  useEffect(() => {
    console.log('GameContext mounted, fetching initial games...'); // Debug log
    fetchGames();
  }, [fetchGames]);

  const value = {
    games,
    loading,
    error,
    library,
    hasMore,
    searchGames,
    loadMore,
    fetchGameDetails,
    addToLibrary,
    removeFromLibrary
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 