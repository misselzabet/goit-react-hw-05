import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('Please enter a search term.');
      return;
    }

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
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies found.</p>}
    </div>
  );
}

export default MoviesPage;

