import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { FaStar, FaArrowLeft, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';
import { SiNintendo, SiIos } from 'react-icons/si';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGameDetails } = useGameContext();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGameDetails(id);
        if (isMounted) {
          setGame(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load game details');
          console.error('Error fetching game details:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGameDetails();

    return () => {
      isMounted = false;
    };
  }, [id, getGameDetails]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-danger text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-danger text-xl mb-4">Game not found</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/80 to-secondary/40">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-accent transition-colors duration-300 mb-6"
        >
          <FaArrowLeft />
          <span>Back to Games</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">{game.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="text-white">{game.rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">{game.released}</span>
            </div>

            {/* Platforms */}
            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((platform) => (
                <div
                  key={platform.platform.id}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                  title={platform.platform.name}
                >
                  {getPlatformIcon(platform.platform.slug)}
                  <span className="text-white">{platform.platform.name}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-2">About</h3>
              <p className="text-gray-300">{game.description_raw}</p>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-accent/30 rounded-full text-sm text-accent backdrop-blur-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails; 