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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

// Todo component to display each individual task
const Todo = ({ todo }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Start Function to handle the check button click event
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        // if (t.isCompleted === true) {
        //   t.isCompleted = false;
        // } else {
        //   t.isCompleted = true;
        // }
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
    setShowDeleteDialog(true);
  }
  // Handle update button click event
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  // Close delete dialog
  function handleDeleteModalClose() {
    setShowDeleteDialog(false);
  }
  // Close update dialog
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  // Confirm delete action
  function confirmDelete() {
    const updatedTodos = todos.filter((t) => {
      // if (t.id === todo.id) {
      //   return false;
      // } else {
      //   return true;
      // }
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Confirm update action
  function confirmUpdate() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    handleUpdateClose();
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      {/* ==== START DELETE MODAL ====  */}
      <Dialog
        onClose={handleDeleteModalClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose}>Cancel</Button>
          <Button autoFocus onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== END DELET MODAL ==== */}

      {/* ==== START UPDATE  MODAL ====  */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title Task"
            fullWidth
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button autoFocus onClick={confirmUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== END UPDATE MODAL ==== */}
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
              <Typography variant="h5" sx={{ textAlign: "left" }} gutterBottom>
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
