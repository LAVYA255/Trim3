import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { FaStar, FaCalendarAlt, FaGamepad } from 'react-icons/fa';

const GameDetails = () => {
  const { id } = useParams();
  const { fetchGameDetails, addToLibrary } = useGameContext();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGameDetails = async () => {
      const gameData = await fetchGameDetails(id);
      setGame(gameData);
      setLoading(false);
    };

    loadGameDetails();
  }, [id, fetchGameDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Game not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={game.background_image} 
            alt={game.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              {game.rating}
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              {new Date(game.released).toLocaleDateString()}
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-300">{game.description_raw}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {game.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="bg-accent/20 text-accent px-3 py-1 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => addToLibrary(game, 'collection')}
              className="btn btn-primary w-full"
            >
              Add to Collection
            </button>
            <button 
              onClick={() => addToLibrary(game, 'wishlist')}
              className="btn btn-primary w-full"
            >
              Add to Wishlist
            </button>
            <button 
              onClick={() => addToLibrary(game, 'completed')}
              className="btn btn-primary w-full"
            >
              Mark as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails; 