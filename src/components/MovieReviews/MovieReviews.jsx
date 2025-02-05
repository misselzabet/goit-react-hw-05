import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer YOUR_API_READ_ACCESS_TOKEN`,
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movie reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}

export default MovieReviews;
