import { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { FaTrash } from 'react-icons/fa';

const MyLibrary = () => {
  const { library, removeFromLibrary } = useGameContext();
  const [activeTab, setActiveTab] = useState('collection');

  const tabs = [
    { id: 'collection', label: 'Collection' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      
      <div className="mb-8">
        <div className="flex space-x-4 border-b border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-4 ${
                activeTab === tab.id
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {library[activeTab].length === 0 ? (
        <div className="text-center text-gray-400">
          <p className="text-xl">No games in your {activeTab}</p>
          <p className="mt-2">Browse games and add them to your library!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {library[activeTab].map(game => (
            <div key={game.id} className="relative">
              <GameCard game={game} />
              <button
                onClick={() => removeFromLibrary(game.id, activeTab)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary; 