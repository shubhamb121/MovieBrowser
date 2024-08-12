import axios from 'axios';
const API_KEY = 'c247d397cbaf4eb7a5dad1c6a8c04774';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page,
    },
  });
  return response.data.results;
};

export const fetchPopularMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
  return response.data.results;
};
