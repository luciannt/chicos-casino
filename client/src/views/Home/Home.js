import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Home.module.scss";

const Home = () => {
  return (
    <>
      <div className={styles.navBar}>
        <Link to="/contact">Contact</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
      <h2>Welcome to</h2>
      <h1>Chicot's Casino</h1>
      <h3>Gamble to your heart's content</h3>
      <div className={styles.loginSignup}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default Home;
