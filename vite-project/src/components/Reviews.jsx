import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Reviews.css';

function Reviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [editReviewId, setEditReviewId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        barName: "",
        location: "",
        address: "",
        review: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/session');
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        fetchSession();
        
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

    const handleEditClick = (review) => {
        setEditReviewId(review._id);
        setEditFormData({
          barName: review.barName,
          location: review.location,
          address: review.address,
          review: review.review,
        });
      };
      
      const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
      };
      
      const handleCancelClick = () => {
        setEditReviewId(null);
      };
      
      const handleSaveClick = async () => {
        const editedReview = {
            ...editFormData,
          };
        
          const response = await fetch(`/api/reviews/${editReviewId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              // Include other headers as necessary
            },
            body: JSON.stringify(editedReview),
          });
        
          if (response.ok) {
            const index = reviews.findIndex((r) => r._id === editReviewId);
            const updatedReviews = [...reviews];
            updatedReviews[index] = { ...reviews[index], ...editFormData };
            setReviews(updatedReviews);
            setEditReviewId(null);
          } else {
            // Handle error response
            console.error('Failed to update the review.');
        }
      };

    const handleDeleteClick = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            // Call your API to delete the review
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // On successful delete, filter out the review from the local state
                setReviews(reviews.filter(review => review._id !== reviewId));
            } else {
                // Handle errors
                alert('Failed to delete the review.');
            }
        }
    };

    return (
        <div className="main">
            <div className="title">
                <h1>Bar Reviews</h1>
                <div className="post-btn">
                    <button className="add-review-btn" onClick={() => navigate("/PostReview")}>Add a Review</button>
                </div>
            </div>
            {reviews.map((review) => (
                <div key={review._id} className="review">
                    {editReviewId === review._id ? (
                    <div>
                        {/* The inline edit form */}
                        <input type="text" name="barName" value={editFormData.barName} onChange={handleEditFormChange} />
                        <input type="text" name="location" value={editFormData.location} onChange={handleEditFormChange} />
                        <input type="text" name="address" value={editFormData.address} onChange={handleEditFormChange} />
                        <input type="text" name="review" value={editFormData.review} onChange={handleEditFormChange} />
                        <button type="button" onClick={handleSaveClick}>Save</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                    ) : (
                    <div>
                        {/* The display mode */}
                        <h2>{review.barName}</h2>
                        <p>Location: {review.location}</p>
                        <p>Street Address: {review.address}</p>
                        <p>Review: {review.review}</p>
                        <p>Author: {review.authorName}</p>
                        {isAuthenticated && (
                                <>
                                    <button onClick={() => handleEditClick(review)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(review._id)}>Delete</button>
                                </>
                        )}
                    </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Reviews;
