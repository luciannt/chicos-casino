import axios from "axios";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles/Signup.module.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (values.password === values["confirm-password"]) {
      axios
        .post("/signup", {
          username: values.username,
          password: values.password,
        })
        .then(() => {
          navigate("/menu");
        });
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <form className={styles["signup"]} onSubmit={onSubmitHandler}>
        <h2>What's your name, patron?</h2>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={onChangeHandler} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChangeHandler}
        />
        <label htmlFor="confirm-password">Confirm</label>
        <input
          type="password"
          name="confirm-password"
          id="conform-password"
          onChange={onChangeHandler}
        />
        <button type="submit">Sign up</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
