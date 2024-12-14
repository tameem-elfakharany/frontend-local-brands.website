import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Brands from './components/Brands';
import DeleteAccount from './components/DeleteAccount';
import './App.css';

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Local Brands</div>
          <div className="nav-links">
            {isLoggedIn() ? (
              <>
                <Link to="/brands">Brands</Link>
                <Link to="/delete-account">Delete Account</Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={isLoggedIn() ? <Navigate to="/brands" /> : <LoginForm />}
          />
          <Route
            path="/register"
            element={isLoggedIn() ? <Navigate to="/brands" /> : <RegistrationForm />}
          />
          <Route
            path="/brands"
            element={isLoggedIn() ? <Brands /> : <Navigate to="/login" />}
          />
          <Route
            path="/delete-account"
            element={isLoggedIn() ? <DeleteAccount /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn() ? "/brands" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
