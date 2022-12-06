import React, { useState } from "react";

import styles from "./styles/Login.module.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import { LOGIN } from "../../reducers/constants";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("/login", { ...values }).then((res) => {
      console.log(res.data);
      dispatch({ type: LOGIN, payload: res.data });

      navigate("/menu");
    });
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input name="username" onChange={onChangeHandler} />
      <input name="password" type="password" onChange={onChangeHandler} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
