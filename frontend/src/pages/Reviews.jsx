import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db, auth } from "../auth/firebase";
import {
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

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

      await addDoc(reviewsRef, {
        text: newReview,
        rating: 5,
        userId: auth.currentUser.uid,
        timestamp: new Date(),
      });

      setNewReview("");
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a review..."
      />
      <button onClick={addReview}>Submit Review</button>
    </div>
  );
};
Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Reviews;
