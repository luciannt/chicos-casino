import axios from "axios";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles/Settings.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN } from "../../reducers/constants";

const Settings = () => {
  const [values, setValues] = useState({});
  const [error, setError] = useState("");

  const session = useSelector((state) => state.sessions.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (values?.username?.length > 1) {
      axios
        .patch(`/users/${session?.id || session}`, {
          username: values.username,
        })
        .then(() => {
          navigate("/menu");
        });
    } else {
      setError("Must enter a username");
    }
  };

  useEffect(() => {
    if (!session?.id) {
      axios.get("/me").then((res) => {
        dispatch({ type: LOGIN, payload: { ...res.data } });
      });
    }
    console.log(session);
    setValues({ username: session?.username });
  }, [session]);

  return (
    <div className={styles.container}>
      <NavBar />
      <form className={styles["settings"]} onSubmit={onSubmitHandler}>
        <Link className={styles["back"]} to="/menu">
          {"<-"} Back
        </Link>
        <h2>Settings</h2>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          onChange={onChangeHandler}
          value={values.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChangeHandler}
        />

        <button type="submit">Confirm</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Settings;
