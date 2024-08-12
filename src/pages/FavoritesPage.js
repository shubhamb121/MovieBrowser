import React, { useEffect, useState } from 'react';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  

  return (
    <div className="favorite-movies-container">
      <h2>Your Favorite Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {favorites.length === 0 ? (
          <p>You haven't added any favorite movies yet.</p>
        ) : (
          favorites.map(movie => (
            <div key={movie.id} className="movie-card border p-4">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3 className="text-xl mt-2">{movie.title}</h3>
              <p>Release Year: {movie.release_date.split('-')[0]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
