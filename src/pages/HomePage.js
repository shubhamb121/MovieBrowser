import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import MovieFilters from '../components/MovieFilters';
import axios from 'axios';
const API_KEY = 'c247d397cbaf4eb7a5dad1c6a8c04774';
const BASE_URL = 'https://api.themoviedb.org/3';


const HomePage = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ selectedGenres: [], yearRange: [2000, 2023], ratingRange: [0, 10] });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true);


  useEffect(()=>{
    setPage(1);
    fetchMovies();
  },[filters])


  useEffect(()=>{
    fetchMovies();
  },[page])


  const handleScroll = () => {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight-50 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
  

  const fetchMovies = async () => {
    setLoading(true);
    let genreParam = filters.selectedGenres.length ? `&with_genres=${filters.selectedGenres.join(',')}` : '';
    let yearParam = `&primary_release_date.gte=${filters.yearRange[0]}-01-01&primary_release_date.lte=${filters.yearRange[1]}-12-31`;
    let ratingParam = `&vote_average.gte=${filters.ratingRange[0]}&vote_average.lte=${filters.ratingRange[1]}`;
    let searchParam = searchTerm ? `&query=${searchTerm}` : '';
   
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}${genreParam}${yearParam}${ratingParam}${searchParam}`
    );

    if(response?.data?.results ){
      if(page>1){
        setMovies((prev)=>[...prev,...response.data.results]);
      }else{
        setMovies([...response.data.results]);
      }
    }
     if(response?.data?.page >= response?.data?.totalPages){
      setHasMore(false);
    }

    setLoading(false);

  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setMovies([]);
  };



  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Movie Browser</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for movies..."
        className="p-2 border rounded-lg w-full"
      />
    <MovieFilters onFilterChange={setFilters} />
      
      <button className="p-2 bg-green-500 text-white rounded" >Go to Favorites</button>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      
      </div>
      {/* <InfiniteScroll fetchMore={fetchMoreMovies} loading={loading} /> */}
    </div>
  );
};

export default HomePage;
