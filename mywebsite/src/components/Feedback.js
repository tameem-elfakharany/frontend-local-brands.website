import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
  const { brandId, productId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/feedback/${brandId}/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      alert('Thank you for your feedback!');
      navigate(`/brands/${brandId}/products/${productId}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-button ${star <= feedback.rating ? 'active' : ''}`}
                onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={feedback.comment}
            onChange={handleChange}
            placeholder="Share your experience..."
            required
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/brands/${brandId}/products/${productId}`)}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
