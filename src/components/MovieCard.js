import React from 'react';

const MovieCard = ({ movie }) => {
  
  const saveFavoriteMovie = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieExists = favorites.some(fav => fav.id === movie.id);

    if (!movieExists) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${movie.title} has been added to your favorites.`);
    } else {
      alert(`${movie.title} is already in your favorites.`);
    }
  };

  return (
    <div className="movie-card border p-4">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3 className="text-xl mt-2">{movie.title}</h3>
      <p>Release Year: {movie.release_date.split('-')[0]}</p>
      <button 
        onClick={saveFavoriteMovie} 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default MovieCard;
