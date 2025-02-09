import { useState } from "react";
import "../assets/stylesheet/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! Our team will get back to you soon.");
  };

  return (
    <div className="contact-page">
      <h1>Contact Support</h1>
      <p>
        Need help? Reach out to us and we’ll assist you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>

      <div className="quick-links">
        <h3>Quick Support Links</h3>
        <ul>
          <li>
            <Link to="/faq">FAQs</Link>
          </li>
          <li>
            <Link to="/track-order">Track My Order</Link>
          </li>
          <li>
            <Link to="/returns">Return & Refund Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
