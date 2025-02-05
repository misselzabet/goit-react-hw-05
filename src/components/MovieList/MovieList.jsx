import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';



function MovieList({ movies }) {
  const location = useLocation(); // Отримання об'єкта location

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default MovieList;

