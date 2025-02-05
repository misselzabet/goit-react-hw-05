import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmU4MmFmNDhhOGVkNmM2YjgyYzhkNDhlZDZjNjIwOSIsIm5iZiI6MTczODc1NjQwMS45MTIsInN1YiI6IjY3YTM1MTMxNDRkNjg2M2I3NDhhNzdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cojCoauTo3EVNiiV2qO1cXAlSvfYmxVCEojjw4Kblno`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Link to={backLinkRef.current} className={styles.backLink}>Go back</Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      /> <nav>
        <ul>
          <li><Link to={`cast`} state={{ from: location }}>Cast</Link></li>
          <li><Link to={`reviews`} state={{ from: location }}>Reviews</Link></li>
        </ul>
      </nav>
       <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
