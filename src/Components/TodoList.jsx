import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Import the Todo component
import Todo from "./Todo";

// OTHERS
import { TodosContext } from "../Context/todosContext";
import { ToastContext } from "../Context/ToastContext";
import { useToast } from "../Context/ToastContext";
import { useState, useContext, useEffect, useMemo } from "react";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Import UUID for generating unique IDs
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);

  const [dialogTodo, setdialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [titleInput, setTitleInput] = useState(""); // State for the input field
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notcompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // Function to handle the addition of a new todo item
  function handleAddClick() {
    // Create a new todo with the current input value as the title
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    // Add the new todo to the list and clear the input field
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast("New mission added successfully");
  }
  // ==================== START HANDLERS ==================== //
  // eslint-disable-next-line no-unused-vars
  // Delete Dialog
  function openDeleteDialog(todo) {
    setdialogTodo(todo);
    setShowDeleteDialog(true);
  }
  // Close delete dialog
  function handleDeleteModalClose() {
    setShowDeleteDialog(false);
  }
  // Confirm delete action
  function handleconfirmDelete() {
    console.log(dialogTodo.id);

    const updatedTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    showHideToast("Deleted successfully");
  }

  // Update Dialog
  function openUpateDialog(todo) {
    setdialogTodo(todo);
    setShowUpdateDialog(true);
  }
  // Close update dialog
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  // Confirm update action
  function handelconfirmUpdate() {
    const updateTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: dialogTodo.title, details: dialogTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updateTodos);
    handleUpdateClose();
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    showHideToast("updated successfully");
  }
  // ==================== END HANDLERS ==================== //
  // Convert the list of todos to JSX elements
  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpateDialog}
      />
    );
  });
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
          <Button autoFocus onClick={handleconfirmDelete}>
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
          {dialogTodo && ( // Check if dialogTodo is not null
            <>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title Task"
                fullWidth
                value={dialogTodo.title}
                onChange={(e) => {
                  setdialogTodo({ ...dialogTodo, title: e.target.value });
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="details"
                label="Details"
                fullWidth
                value={dialogTodo.details}
                onChange={(e) => {
                  setdialogTodo({ ...dialogTodo, details: e.target.value });
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button autoFocus onClick={handelconfirmUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==== END UPDATE MODAL ==== */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography style={{ fontWeight: "bold" }} variant="h2">
              My Tasks
            </Typography>
            <Divider />

            {/* ==== START FILTER BUTTONS ==== */}
            <ToggleButtonGroup
              style={{ marginTop: "30px" }}
              color="primary"
              exclusive
              aria-label="Platform"
              value={displayedTodosType}
              onChange={changeDisplayedType}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Done</ToggleButton>
              <ToggleButton value="non-completed">Unfulfilled</ToggleButton>
            </ToggleButtonGroup>
            {/* ==== END FILTER BUTTONS ==== */}

            {/* ==== START ALL TODOS ==== */}
            {todosJsx}
            {/* ==== END ALL TODOS ==== */}

            {/* ==== START ADD BUTTON ==== */}
            <Grid container style={{ marginTop: "15px" }} spacing={2}>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={handleAddClick}
                  disabled={titleInput.length <= 0}
                >
                  Add Task
                </Button>
              </Grid>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="task title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* ==== END ADD BUTTON ==== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
