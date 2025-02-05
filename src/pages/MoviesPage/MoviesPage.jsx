import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmU4MmFmNDhhOGVkNmM2YjgyYzhkNDhlZDZjNjIwOSIsIm5iZiI6MTczODc1NjQwMS45MTIsInN1YiI6IjY3YTM1MTMxNDRkNjg2M2I3NDhhNzdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cojCoauTo3EVNiiV2qO1cXAlSvfYmxVCEojjw4Kblno`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const queryValue = form.elements.query.value.trim();
    if (queryValue === '') {
      alert('Please enter a search term.');
      return;
    }
    setSearchParams({ query: queryValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies found.</p>}
    </div>
  );
}

export default MoviesPage;

