import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { FaSearch, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';
import { SiNintendo, SiIos } from 'react-icons/si';

const Home = () => {
  const { 
    games, 
    loading, 
    error, 
    genres, 
    platforms,
    selectedGenre, 
    selectedPlatform,
    searchGames, 
    selectGenre,
    selectPlatform,
    loadMore 
  } = useGameContext();

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

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'pc':
        return <FaWindows className="text-blue-400" />;
      case 'playstation':
        return <FaPlaystation className="text-blue-500" />;
      case 'xbox':
        return <FaXbox className="text-green-500" />;
      case 'nintendo':
        return <SiNintendo className="text-red-500" />;
      case 'mac':
        return <FaApple className="text-gray-400" />;
      case 'linux':
        return <FaLinux className="text-yellow-400" />;
      case 'ios':
        return <SiIos className="text-gray-300" />;
      case 'android':
        return <FaAndroid className="text-green-400" />;
      default:
        return null;
    }
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
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectGenre(null)}
                className={`badge ${!selectedGenre ? 'badge-primary' : 'badge-secondary'}`}
              >
                All Genres
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

          {/* Platform Filter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectPlatform(null)}
                className={`badge ${!selectedPlatform ? 'badge-primary' : 'badge-secondary'}`}
              >
                All Platforms
              </button>
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => selectPlatform(platform.id)}
                  className={`badge ${selectedPlatform === platform.id ? 'badge-primary' : 'badge-secondary'} flex items-center gap-1`}
                >
                  {getPlatformIcon(platform.slug)}
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
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