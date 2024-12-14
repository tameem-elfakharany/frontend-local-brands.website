import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteAccount.css';

const API_BASE_URL = 'http://localhost:3000';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  const handleDelete = async () => {
    if (!confirmed) {
      setError('Please confirm that you want to delete your account');
      return;
    }

    if (!userId) {
      setError('User ID not found. Please try logging in again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting to delete account with ID:', userId);

      const response = await fetch(`${API_BASE_URL}/user/account/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      console.log('Delete response status:', response.status);
      const responseText = await response.text();
      console.log('Delete response text:', responseText);

      if (!response.ok) {
        throw new Error(responseText || 'Failed to delete account');
      }

      // Clear local storage and redirect to login
      localStorage.clear();
      alert('Your account has been successfully deleted');
      window.location.href = '/login';
    } catch (err) {
      console.error('Delete account error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !username || !userId) {
    return (
      <div className="delete-account-container">
        <div className="delete-account-card">
          <h2>Error</h2>
          <p>You must be logged in to delete your account.</p>
          <button onClick={() => window.location.href = '/login'}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="delete-account-container">
      <div className="delete-account-card">
        <h2>Delete Account</h2>
        
        <div className="account-info">
          <div className="info-group">
            <label>Username:</label>
            <span>{username}</span>
          </div>
          <div className="info-group">
            <label>Email:</label>
            <span>{email}</span>
          </div>
        </div>

        <div className="warning-message">
          <h3>⚠️ Warning</h3>
          <p>This action cannot be undone. All your data will be permanently deleted.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="confirmation-checkbox">
          <input
            type="checkbox"
            id="confirm"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <label htmlFor="confirm">
            I understand that this action is permanent and cannot be undone
          </label>
        </div>

        <div className="button-group">
          <button
            onClick={handleDelete}
            className="delete-button"
            disabled={!confirmed || isLoading}
          >
            {isLoading ? 'Deleting Account...' : 'Delete Account'}
          </button>
          <button
            onClick={() => navigate('/brands')}
            className="cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
