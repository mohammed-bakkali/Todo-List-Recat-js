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
import { useContext } from "react";
import { useState } from "react";

// Import UUID for generating unique IDs
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const {todos, setTodos} = useContext(TodosContext);
  
  const [titleInput, setTitleInput] = useState(""); // State for the input field



  // Convert the list of todos to JSX elements
  const todosJsx = todos.map((t) => {
    return <Todo key={t.id} todo={t}  />;
  });

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
    setTodos([...todos, newTodo]);
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 270 }}>
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
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="unfulfilled">Unfulfilled</ToggleButton>
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
