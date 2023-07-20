import React, { useState } from "react";
import { registerUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { Account } from "../../models/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const user: Account = {
      email: username,
      password: password,
    };

    if (password === confirmPassword) {
      dispatch<any>(registerUser(user))
        .then(unwrapResult)
        .then((user: any) => {
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
    } else {
      setLoading(false);
      setErrorMessage("Passwords do not match");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Typography variant="h4" align="center" gutterBottom>
          Welcome, Please Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            name="email"
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Typography variant="body1" align="center" gutterBottom>
            Already have an account? <Link href="/">Login</Link>
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
      {!!loading && <CircularProgress />}
    </>
  );
};

export default Register;
