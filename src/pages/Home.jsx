import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const { games, loading, error, genres, selectedGenre, searchGames, selectGenre, loadMore } = useGameContext();
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
    if (debouncedSearch) {
      searchGames(debouncedSearch);
    }
  }, [debouncedSearch, searchGames]);

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
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search games..."
                className="input w-full pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button type="submit" className="btn btn-primary px-6">
              Search
            </button>
          </form>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => selectGenre(null)}
              className={`badge ${!selectedGenre ? 'badge-primary' : 'badge-secondary'}`}
            >
              All Games
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => selectGenre(genre.id)}
                className={`badge ${selectedGenre === genre.id ? 'badge-primary' : 'badge-secondary'}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        {loading && !games.length ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse text-accent text-4xl">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-danger text-2xl">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            {games.length > 0 && (
              <div className="mt-8 text-center">
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
    </div>
  );
};

export default Home; 