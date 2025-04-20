import { Link } from 'react-router-dom';
import { FaStar, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';
import { SiNintendo, SiIos } from 'react-icons/si';

const GameCard = ({ game }) => {
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

  return (
    <Link to={`/game/${game.id}`} className="group">
      <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.background_image || 'https://via.placeholder.com/400x225'}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300">
            {game.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-200">{game.rating?.toFixed(1) || 'N/A'}</span>
          </div>

          {/* Platforms */}
          <div className="flex flex-wrap gap-2 mb-3">
            {game.platforms?.map((platform) => (
              <div
                key={platform.platform.id}
                className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                title={platform.platform.name}
              >
                {getPlatformIcon(platform.platform.slug)}
                <span className="text-xs text-gray-200">{platform.platform.name}</span>
              </div>
            ))}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {game.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-accent/30 rounded-full text-xs text-accent backdrop-blur-sm"
              >
                {genre.name}
              </span>
            ))}
            {game.genres?.length > 2 && (
              <span className="px-2 py-1 bg-accent/30 rounded-full text-xs text-accent backdrop-blur-sm">
                +{game.genres.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard; 