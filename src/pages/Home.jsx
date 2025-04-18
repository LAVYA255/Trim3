import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const { games, loading, error, hasMore, searchGames, loadMore } = useGameContext();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== '') {
      searchGames(debouncedSearch);
    } else {
      searchGames('');
    }
  }, [debouncedSearch, searchGames]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchGames(searchInput);
  };

  if (loading && games.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        <span className="ml-4">Loading games...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => searchGames(searchInput)}
          className="btn btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Popular Games</h1>
        <form onSubmit={handleSearchSubmit} className="max-w-md">
          <div className="relative flex">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search games..."
              className="w-full p-3 pl-10 rounded-l-lg bg-secondary border border-gray-700 focus:border-accent focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="px-4 py-3 bg-accent text-white rounded-r-lg hover:bg-accent/90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {games.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">No games found</p>
          <button 
            onClick={() => searchGames('')}
            className="btn btn-primary mt-4"
          >
            Load Games
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home; 