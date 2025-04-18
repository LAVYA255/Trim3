import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import MyLibrary from './pages/MyLibrary';
import AddGame from './pages/AddGame';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-primary">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/library" element={<MyLibrary />} />
              <Route path="/add-game" element={<AddGame />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
