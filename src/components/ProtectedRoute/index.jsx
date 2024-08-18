// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import ApiService from "../../api/ApiService";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token") || "";
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await ApiService.post("/user/verify_jwt", { token });
        if (response.data.message === "Token is valid") {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return (
      <section
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="spinner-border text-secondary"
          style={{ width: "2rem", height: "2rem" }}
          role="status"
        >
        </div>
      </section>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;