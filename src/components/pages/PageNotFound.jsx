import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <FaExclamationTriangle style={styles.icon} />
      <a href="/" style={styles.button}>Go Back Home</a>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#fff5f5",
    padding: "20px",
  },
  icon: {
    fontSize: "80px",
    color: "#e63946",
    marginBottom: "10px",
  },
  title: {
    fontSize: "72px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#1d3557",
  },
  message: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#457b9d",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#1d3557",
    color: "#f1faee",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background 0.3s ease",
  },
};

export default PageNotFound;