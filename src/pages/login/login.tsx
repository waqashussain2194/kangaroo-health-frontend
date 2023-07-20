import React, { useEffect, useState } from "react";
import { loginUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { Account } from "../../models/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      navigate("/dashboard");
    }
  });

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const user: Account = {
      email: username,
      password: password,
    };

    dispatch<any>(loginUser(user))
      .then(unwrapResult)
      .then((user: any) => {
        console.log(user);
        // handle result here
        setLoading(false);
        if (user.jwtToken) {
          navigate("/dashboard");
        } else {
          setErrorMessage(user);
        }
      })
      .catch((err: any) => {
        // handle result here
        setLoading(false);
        setErrorMessage(err);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Typography variant="h4" align="center" gutterBottom>
          Welcome, Please Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            margin="normal"
          />
          <Typography variant="body1" align="center" gutterBottom>
            New here? <Link href="/register">Register</Link>
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Container>
      {!!loading && <CircularProgress />}
    </>
  );
};

export default Login;
