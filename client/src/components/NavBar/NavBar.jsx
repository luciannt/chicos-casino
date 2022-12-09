import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles/NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <img src="https://cdn-icons-png.flaticon.com/512/4950/4950057.png" />
      </Link>
      <div className={styles.links}>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default NavBar;
