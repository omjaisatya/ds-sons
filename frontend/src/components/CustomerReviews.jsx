import "../assets/stylesheet/CustomerReviews.css";

const CustomerReviews = () => {
  const reviews = [
    {
      text: "Great quality & super-fast delivery! Highly recommended.",
      name: "Ramesh",
      tag: "Verified Buyer",
    },
    {
      text: "Loved the discounts! Ordered groceries & got them fresh.",
      name: "Pooja",
      tag: "Happy Customer",
    },
  ];

  return (
    <section className="customer-reviews">
      <h1>Customer Reviews & Testimonials</h1>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p className="review-text">&quot;{review.text}&quot;</p>
            <p className="review-author">
              – {review.name}, <span>{review.tag}</span>
            </p>
          </div>
        ))}
      </div>
      {/* <button className="cta-button">Read More Reviews</button> */}
    </section>
  );
};

export default CustomerReviews;
