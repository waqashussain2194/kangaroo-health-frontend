import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUser, logoutUser } from "../../redux/actions/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { createTodo, deleteTodo } from "../../redux/actions/todo";
import ColumnTable from "./table";

const Dashboard = () => {
  const [user, setUser] = useState<any>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: 0,
    completed: false,
  });
  const [allTodos, setAllTodos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    formData["userId"] = user?.id;
    dispatch<any>(createTodo(formData))
      .then(unwrapResult)
      .then((todo: any) => {
        // handle result here
        setLoading(false);
        if (todo) {
          setFormData({
            title: "",
            description: "",
            userId: 0,
            completed: false,
          });
          setAllTodos([...allTodos, todo]);
          setSuccessMessage("Todo created Successfully.");
          setErrorMessage("");
        } else {
          setErrorMessage(todo);
        }
      })
      .catch((err: any) => {
        // handle result here
        setLoading(false);
        setErrorMessage(err);
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCurrentUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch<any>(fetchLoggedInUser(userId))
        .then(unwrapResult)
        .then((user: any) => {
          // handle result here
          setLoading(false);
          if (user) {
            setUser(user);
            setAllTodos(user?.todos);
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
      navigate("/");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    dispatch<any>(logoutUser())
      .then(unwrapResult)
      .then((res: any) => {
        // handle result here
        setLoading(false);
        if (res) {
          navigate("/");
        } else {
          setErrorMessage("Error logging out");
        }
      })
      .catch((err: any) => {
        // handle result here
        setLoading(false);
        setErrorMessage(err);
      });
  };

  const deleteTask = (id: number) => {
    dispatch<any>(deleteTodo(id))
      .then(unwrapResult)
      .then((res: any) => {
        // handle result here
        setLoading(false);
        if (res) {
          fetchCurrentUser();
          setSuccessMessage("Task deleted successfully.");
          setErrorMessage("");
        } else {
          setErrorMessage("Error deleting the task.");
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
        {!!successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Box display="flex" justifyContent="space-between">
          {/* Components you want to stack horizontally */}
          <div>Hello, {user?.email}</div>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Enter a new Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>

        {!!allTodos.length && (
          <ColumnTable tableData={allTodos} deleteTodo={deleteTask} />
        )}
      </Container>
      {!!loading && <CircularProgress />}
    </>
  );
};

export default Dashboard;
