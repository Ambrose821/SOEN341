import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import { useAuth } from '../apiServices/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Review Component
const Review = ({ review }) => {
  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="subtitle1">{review.email}</Typography>
        <Rating name="read-only" value={review.stars} readOnly />
      </Box>
      <Typography variant="body2">{review.comment}</Typography>
    </Box>
  );
};

// CarReviewsPage Component
const CarReviewsPage = () => {

    const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin, updateUserInfo,deleteUser } = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const {vehicleId} = location.state || {};

    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [newEmail, setNewEmail] = useState(currentUser);
    const [averageRating, setAverageRating] = useState(0);


  const addReview = async () => {
    
    const response = await fetch('http://localhost:9000/reviews/uploadReview',{
        method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                newRating,
                newComment,
                newEmail,
                vehicleId,
              }),
            });

        const data = response.json();
        console.log(data);

        navigate('/');
    
        setNewRating(0);
        setNewComment("");
        setNewEmail("");
  };

  useEffect(() => {
    // Define getReviews inside useEffect or make sure it's defined outside but used inside useEffect
    const getReviews = async () => {
      try {
        const response = await fetch('http://localhost:9000/reviews/getReviewsByCarId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vehicleId,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setReviews(data.reviews);

        const total = data.reviews.reduce((acc, curr) => acc + curr.stars, 0);
        const average = data.reviews.length > 0 ? total / data.reviews.length : 0;
        setAverageRating(average);

      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    getReviews();
  }, [vehicleId]); 

  return (
    <div>
      <h2>Car's Overall Review <Rating name="read-only" value={averageRating} readOnly precision={0.5} /></h2>
            {reviews.map(review => (
                <Review key={review.id} review={review} />
            ))}
            <Box component="form" sx={{ mt: 4 }}>
                {/* Existing form to submit a new review */}
            </Box>
      <Box component="form" sx={{ mt: 4 }}>
        <Typography variant="h6">Submit Your Review</Typography>
        <TextField
          fullWidth
          label="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          margin="normal"
        />
        <Rating
          name="simple-controlled"
          value={newRating}
          onChange={(event, newValue) => {
            setNewRating(newValue);
          }}
        />
        <TextField
          fullWidth
          label="Comment"
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={addReview} sx={{ mt: 2 }}>Publish</Button>
      </Box>
    </div>
  );
};

export default CarReviewsPage;
