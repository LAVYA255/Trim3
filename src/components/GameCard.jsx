import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="card hover:scale-105 transition-transform duration-300">
      <Link to={`/game/${game.id}`}>
        <img 
          src={game.background_image} 
          alt={game.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
          <div className="flex flex-wrap gap-2">
            {game.genres?.slice(0, 3).map(genre => (
              <span 
                key={genre.id}
                className="bg-accent/20 text-accent px-2 py-1 rounded text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Rating: {game.rating}
            </span>
            <span className="text-sm text-gray-400">
              Released: {new Date(game.released).getFullYear()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard; 