import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../CSS/Home.css';
import Navbar from "../components/Navbar";

const Home = () => {
  const { setUserFromCookie, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie) {
      setUserFromCookie();
    }
  }, [setUserFromCookie]);

  useEffect(() => {
    if (user) {
      console.log("User loaded from cookie:", user);
    }
  }, [user]);

  const handleGoToDashboard = () => {
    console.log("Navigating to dashboard..."); 
    navigate("/dashboard");
  };

  return (
    <div className="home-container">
        <Navbar />
      <h1 className="welcome">Welcome to Xeno CRM <span className="rocket">🚀</span></h1>
      {user ? (
        <>
          <p className="homeText">Hello, {user.name}! Ready to explore your dashboard?</p>
          <button className="dashboard-btn" onClick={handleGoToDashboard}>
            Go to Dashboard
          </button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
