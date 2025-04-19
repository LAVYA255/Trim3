import { Link, useLocation } from 'react-router-dom';
import { FaGamepad, FaBookmark, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-secondary/80 backdrop-blur-lg py-4 sticky top-0 z-50 shadow-lg border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center group hover:scale-105 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-300">
              <FaGamepad className="text-2xl text-accent group-hover:text-accent-light transition-colors duration-300" />
            </div>
            <span className="ml-2 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-right transition-all duration-500">
              GamerVault
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/library" 
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent/10 
                ${location.pathname === '/library' 
                  ? 'text-accent font-semibold' 
                  : 'text-gray-300 hover:text-white'}`}
            >
              <FaBookmark className={`mr-2 transition-transform duration-300 ${location.pathname === '/library' ? 'scale-110' : ''}`} />
              <span>My Library</span>
            </Link>
            <Link 
              to="/add-game" 
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-accent/10
                ${location.pathname === '/add-game' 
                  ? 'text-accent font-semibold' 
                  : 'text-gray-300 hover:text-white'}`}
            >
              <FaPlus className={`mr-2 transition-transform duration-300 ${location.pathname === '/add-game' ? 'scale-110' : ''}`} />
              <span>Add Game</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 