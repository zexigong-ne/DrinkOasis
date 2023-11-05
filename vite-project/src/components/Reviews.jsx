import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Reviews.css';

function Reviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(response => response.json())
            .then(data => {
              if (Array.isArray(data)) {
                  setReviews(data);
              } else {
                  console.error("Unexpected data format:", data);
              }
          })
            .catch(error => console.error("Error fetching reviews:", error));
    }, []);

    return (
        <div className="main">
            <div className="title">
                <h1>Bar Reviews</h1>
                <div className="post-btn">
                    <button className="add-review-btn" onClick={() => navigate("/PostReview")}>Add a Review</button>
                </div>
            </div>
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    <h2>{review.barName}</h2>
                    <p>Location: {review.location}</p>
                    <p>Street Address: {review.address}</p>
                    <p>Review: {review.review}</p>
                    <p>Author: {review.authorName}</p>
                </div>
            ))}
        </div>
    );
}

export default Reviews;
