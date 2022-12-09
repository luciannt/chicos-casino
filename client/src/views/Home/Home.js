import React from "react";
import { Link } from "react-router-dom";
import jester from "../../assets/jester.png";
import NavBar from "../../components/NavBar/NavBar";

import styles from "./styles/Home.module.scss";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className={styles.info}>
        <div className={styles.title}>
          <h2>Welcome to</h2> <h1>Chicot's Casino</h1>
        </div>
        <img src={jester} className={styles.logo} />
        <h3>Play to your heart's content</h3>
      </div>
      <div className={styles.loginSignup}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default Home;
