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
import { useState, useContext, useEffect } from "react";

// Import UUID for generating unique IDs
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState(""); // State for the input field
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notcompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // Convert the list of todos to JSX elements
  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos) ?? [];
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
  }

  return (
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
  );
}
