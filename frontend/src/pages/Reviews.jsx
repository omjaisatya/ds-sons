import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db, auth } from "../auth/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import "../assets/stylesheet/Reviews.css";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5); // Default rating
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false); // New state for input disable

  console.log("Auuth", auth);

  const fetchReviews = async () => {
    try {
      if (!productId) return;

      const reviewsRef = collection(db, "products", productId, "reviews");
      const q = query(reviewsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(reviewsData);

      const totalRating = reviewsData.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviewsData.length;
      setAverageRating(avgRating.toFixed(1));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const addReview = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to leave a review.");
      return;
    }
    if (!newReview.trim()) {
      alert("Review cannot be empty.");
      return;
    }

    try {
      const reviewsRef = collection(db, "products", productId, "reviews");

      const userName = auth.currentUser.name || `User ${auth.currentUser.uid}`;

      await addDoc(reviewsRef, {
        text: newReview,
        rating,
        userId: auth.currentUser.uid,
        // userName: auth.currentUser.displayName || "Anonymous",
        userName,
        timestamp: new Date(),
      });

      setNewReview("");
      setRating(5);
      setIsReviewSubmitted(true);
      setIsInputDisabled(true); // Disable the input after review submission
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!auth.currentUser) return;

    const review = reviews.find((r) => r.id === reviewId);
    if (review && review.userId === auth.currentUser.uid) {
      try {
        const reviewRef = doc(db, "products", productId, "reviews", reviewId);
        await deleteDoc(reviewRef);
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    } else {
      alert("You can only delete your own reviews.");
    }
  };

  const editReview = async (reviewId, newText, newRating) => {
    if (!auth.currentUser) return;

    const review = reviews.find((r) => r.id === reviewId);
    if (review && review.userId === auth.currentUser.uid) {
      try {
        const reviewRef = doc(db, "products", productId, "reviews", reviewId);
        await updateDoc(reviewRef, {
          text: newText,
          rating: newRating,
          timestamp: new Date(),
        });
        fetchReviews();
      } catch (error) {
        console.error("Error updating review:", error);
      }
    } else {
      alert("You can only edit your own reviews.");
    }
  };

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      <div className="average-rating">
        <strong>Average Rating:</strong> {averageRating} ⭐
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <p className="review-text">{review.text}</p>
            <div className="review-rating">Rating: {review.rating} ⭐</div>
            <div className="review-user">
              <strong>{review.userName}</strong> on{" "}
              {new Date(review.timestamp.seconds * 1000).toLocaleDateString()}
            </div>
            {review.userId === auth.currentUser?.uid && (
              <div className="review-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    const newText = prompt("Edit your review:", review.text);
                    const newRating = parseInt(
                      prompt("Rate from 1 to 5 stars:", review.rating),
                      10
                    );
                    if (newText && newRating) {
                      editReview(review.id, newText, newRating);
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      )}

      {!isReviewSubmitted ? (
        <div className="review-form">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className="review-input"
            disabled={isInputDisabled} // Disable when a rating is selected
          />
          <div className="rating-stars">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => {
                  setRating(star);
                  setIsInputDisabled(true); // Disable input after selecting a rating
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: star <= rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <button className="submit-btn" onClick={addReview}>
            Submit Review
          </button>
        </div>
      ) : (
        <p className="review-submitted">Your review has been submitted!</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Reviews;
