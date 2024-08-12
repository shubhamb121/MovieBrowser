import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MovieFilters = ({ onFilterChange }) => {

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([2000, 2023]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const API_KEY = 'c247d397cbaf4eb7a5dad1c6a8c04774';


  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  }; 


  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres(prevState => 
      prevState.includes(genre) ? prevState.filter(g => g !== genre) : [...prevState, genre]
    );
  };

  useEffect(() => {
    onFilterChange({ selectedGenres, yearRange, ratingRange });
  }, [selectedGenres, yearRange, ratingRange]);

  return (
    <div className="filter-container">
      <h3>Filter Movies</h3>
      <div  className="filter-group">
        <label>Genres:</label>
        <div className="genre-container">
        {genres.map(genre => (
            <div key={genre.id} className="genre-item">
            <input 
              type="checkbox" 
              value={genre.id} 
              label= {genre.name}
              onChange={() => handleGenreChange(genre.id)} 
            />
            <span>{genre.name}</span>
          </div>
        ))}
      </div>
      </div>

      <div className="filter-group">
        <label>Release Year Range:</label>
        <input 
          type="range" 
          min="1980" 
          max="2024" 
          value={yearRange[0]} 
          onChange={(e) => setYearRange([+e.target.value, yearRange[1]])} 
        />
        <input 
          type="range" 
          min="1980" 
          max="2024" 
          value={yearRange[1]} 
          onChange={(e) => setYearRange([yearRange[0], +e.target.value])} 
        />
        <span>{`${yearRange[0]} - ${yearRange[1]}`}</span>
      </div>

      <div className="filter-group">
        <label>Rating Range:</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={ratingRange[0]} 
          onChange={(e) => setRatingRange([+e.target.value, ratingRange[1]])} 
        />
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={ratingRange[1]} 
          onChange={(e) => setRatingRange([ratingRange[0], +e.target.value])} 
        />
        <span>{`${ratingRange[0]} - ${ratingRange[1]}`}</span>
      </div>
    </div>
  );
};

export default MovieFilters;
