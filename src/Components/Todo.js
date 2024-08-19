import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// OTHERS
import { useContext, useState } from "react";
import { TodosContext } from "../Context/todosContext";

// DIALOG IMPORTS
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";

// Todo component to display each individual task
const Todo = ({ todo, showDelete, showUpdate }) => {

  const [updatedTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Start Function to handle the check button click event
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // End Function to handle the check button click event

  // Handle delete button click event
  function handleDeleteClick() {
    showDelete(todo);
  }
  // Handle update button click event
  function handleUpdateClick() {
    showUpdate(todo);
  }

  

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                gutterBottom
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
                {todo.details}
              </Typography>
            </Grid>
            {/* ==== START ACTIION BUTTONS ==== */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* ==== Start Check Icon Button ====*/}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ==== End Check Icon Button ==== */}

              {/* ==== Start Edite Icon Button ====  */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* ==== Start Delete Icon Button ====  */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ==== End Delete Icon Button ====  */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
