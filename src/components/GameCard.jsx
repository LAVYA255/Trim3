import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <Link to={`/game/${game.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={game.background_image} 
            alt={game.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
            {game.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {game.genres?.slice(0, 3).map(genre => (
              <span 
                key={genre.id}
                className="badge badge-primary"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {game.rating}
            </span>
            <span>
              {new Date(game.released).getFullYear()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard; 