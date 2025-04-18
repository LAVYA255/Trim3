import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const AddGame = () => {
  const navigate = useNavigate();
  const { addToLibrary } = useGameContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    released: '',
    background_image: '',
    genres: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Game name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    
    if (!formData.released) {
      newErrors.released = 'Release date is required';
    }
    
    if (!formData.background_image.trim()) {
      newErrors.background_image = 'Image URL is required';
    } else if (!formData.background_image.match(/\.(jpg|jpeg|png|gif)$/i)) {
      newErrors.background_image = 'Please enter a valid image URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const game = {
        id: Date.now(), // Generate a unique ID
        ...formData,
        rating: parseFloat(formData.rating),
        genres: formData.genres.split(',').map(genre => ({
          id: Date.now() + Math.random(),
          name: genre.trim()
        }))
      };
      
      addToLibrary(game, 'collection');
      navigate('/library');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add Custom Game</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Game Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-secondary border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 rounded bg-secondary border ${
              errors.description ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className={`w-full p-2 rounded bg-secondary border ${
              errors.rating ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Release Date</label>
          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-secondary border ${
              errors.released ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.released && <p className="text-red-500 text-sm mt-1">{errors.released}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            name="background_image"
            value={formData.background_image}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-secondary border ${
              errors.background_image ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.background_image && <p className="text-red-500 text-sm mt-1">{errors.background_image}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Genres (comma-separated)</label>
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="Action, Adventure, RPG"
            className="w-full p-2 rounded bg-secondary border border-gray-700"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame; 