import { Link } from 'react-router-dom';
import { FaGamepad, FaBookmark, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-accent flex items-center">
            <FaGamepad className="mr-2" />
            GameVault
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/library" 
              className="flex items-center text-white hover:text-accent transition-colors"
            >
              <FaBookmark className="mr-1" />
              My Library
            </Link>
            <Link 
              to="/add-game" 
              className="flex items-center text-white hover:text-accent transition-colors"
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