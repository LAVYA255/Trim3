import { Link, useLocation } from 'react-router-dom';
import { FaGamepad, FaBookmark, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-secondary/50 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white flex items-center group">
            <FaGamepad className="mr-2 text-accent group-hover:text-accent-light transition-colors duration-300" />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              GamerVault
            </span>
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/library" 
              className={`nav-link ${location.pathname === '/library' ? 'nav-link-active' : ''}`}
            >
              <FaBookmark className="mr-1" />
              My Library
            </Link>
            <Link 
              to="/add-game" 
              className={`nav-link ${location.pathname === '/add-game' ? 'nav-link-active' : ''}`}
            >
              <FaPlus className="mr-1" />
              Add Game
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 