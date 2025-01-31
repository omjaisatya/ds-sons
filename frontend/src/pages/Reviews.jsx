import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from "../auth/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import "../assets/stylesheet/Reviews.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5);

  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

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

  const handleLike = async (reviewId) => {
    if (!auth.currentUser) {
      alert("Please login to like or unlike reviews.");
      return;
    }

    const review = reviews.find((r) => r.id === reviewId);
    const reviewRef = doc(db, "products", productId, "reviews", reviewId);

    const currentLikes = review.likes || [];
    const currentUnlikes = review.unlikes || [];

    if (currentLikes.includes(auth.currentUser.uid)) {
      await updateDoc(reviewRef, {
        likes: arrayRemove(auth.currentUser.uid),
      });
    } else {
      await updateDoc(reviewRef, {
        likes: arrayUnion(auth.currentUser.uid),
      });
    }

    if (currentUnlikes.includes(auth.currentUser.uid)) {
      await updateDoc(reviewRef, {
        unlikes: arrayRemove(auth.currentUser.uid),
      });
    }

    fetchReviews();
  };

  const handleUnlike = async (reviewId) => {
    if (!auth.currentUser) {
      alert("Please login to like or unlike reviews.");
      return;
    }

    const review = reviews.find((r) => r.id === reviewId);
    const reviewRef = doc(db, "products", productId, "reviews", reviewId);

    const currentLikes = review.likes || [];
    const currentUnlikes = review.unlikes || [];

    if (currentUnlikes.includes(auth.currentUser.uid)) {
      await updateDoc(reviewRef, {
        unlikes: arrayRemove(auth.currentUser.uid),
      });
    } else {
      await updateDoc(reviewRef, {
        unlikes: arrayUnion(auth.currentUser.uid),
      });
    }

    if (currentLikes.includes(auth.currentUser.uid)) {
      await updateDoc(reviewRef, {
        likes: arrayRemove(auth.currentUser.uid),
      });
    }

    fetchReviews();
  };

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

      onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        console.log("Current user:", currentUser);

        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);

            await addDoc(reviewsRef, {
              text: newReview,
              rating,
              userId: currentUser.uid,
              userName: userData.name,
              timestamp: new Date(),
              likes: [],
              unlikes: [],
            });
          }
        }
      });

      setNewReview("");
      setRating(5);
      setIsReviewSubmitted(true);
      setIsInputDisabled(true);
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

  const handleShowMore = () => {
    if (showMore) {
      setReviewsToShow(5);
    } else {
      setReviewsToShow(reviews.length);
    }
    setShowMore(!showMore);
  };

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      <div className="average-rating">
        <strong>Average Rating:</strong> {averageRating} ⭐
      </div>

      {reviews.length > 0 ? (
        reviews.slice(0, reviewsToShow).map((review) => {
          const currentLikes = review.likes || [];
          const currentUnlikes = review.unlikes || [];
          return (
            <div key={review.id} className="review-item">
              <p className="review-text">{review.text}</p>
              <div className="review-rating">Rating: {review.rating} ⭐</div>
              <div className="review-user">
                <strong>{review.userName}</strong> on{" "}
                {new Date(review.timestamp.seconds * 1000).toLocaleDateString()}
              </div>
              <div className="review-actions">
                <button
                  onClick={() => handleLike(review.id)}
                  className={`like-btn ${
                    currentLikes.includes(auth.currentUser?.uid) ? "liked" : ""
                  }`}
                >
                  <FaThumbsUp className="like-icon" />
                  {currentLikes.includes(auth.currentUser?.uid)
                    ? "Unlike"
                    : "Like"}{" "}
                  ({currentLikes.length})
                </button>
                <button
                  onClick={() => handleUnlike(review.id)}
                  className={`unlike-btn ${
                    currentUnlikes.includes(auth.currentUser?.uid)
                      ? "unliked"
                      : ""
                  }`}
                >
                  <FaThumbsDown className="unlike-icon" />
                  {currentUnlikes.includes(auth.currentUser?.uid)
                    ? "Remove Unlike"
                    : "Unlike"}{" "}
                  ({currentUnlikes.length})
                </button>
                {review.userId === auth.currentUser?.uid && (
                  <>
                    <button
                      className="delete-btn"
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        const newText = prompt(
                          "Edit your review:",
                          review.text
                        );
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
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      )}

      {reviews.length > 5 && (
        <button className="see-more-btn" onClick={handleShowMore}>
          {showMore ? "See Less" : "See More"}
        </button>
      )}

      {!isReviewSubmitted ? (
        <div className="review-form">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className="review-input"
            disabled={isInputDisabled}
          />
          <div className="rating-stars">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => {
                  setRating(star);
                  setIsInputDisabled(true);
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
