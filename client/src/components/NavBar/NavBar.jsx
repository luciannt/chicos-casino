import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles/NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4950/4950057.png"
          to="/contact"
        />
      </Link>
      <div className={styles.links}>
        <Link to="/contact">Contact</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default NavBar;
