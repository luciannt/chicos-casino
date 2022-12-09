import React from "react";
import styles from "./styles/Contact.module.scss";

import NavBar from "../../components/NavBar/NavBar";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className={styles.links}>
        <h2>Follow the creator</h2>
        <a href="https://github.com/luciannt" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25657.png" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/lucianna-tittle/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png" />
          LinkedIn
        </a>
      </div>
    </>
  );
};

export default Contact;
