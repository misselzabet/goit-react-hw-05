import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmU4MmFmNDhhOGVkNmM2YjgyYzhkNDhlZDZjNjIwOSIsIm5iZiI6MTczODc1NjQwMS45MTIsInN1YiI6IjY3YTM1MTMxNDRkNjg2M2I3NDhhNzdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cojCoauTo3EVNiiV2qO1cXAlSvfYmxVCEojjw4Kblno`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <p>{actor.name} as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;

