import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Context/todosContext";
import { useState } from "react";

// Import UUID for generating unique IDs
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"],
  },
});
// Initial list of todos
const initialTodos = [
  {
    id: uuidv4(),
    title: "course react js",
    details: "27h",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Create Project E-commerce by React js",
    details: "30h",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Search Job in front-end",
    details: "2h",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos); // State for list of todos
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Roboto",
        }}
      >
        <TodosContext.Provider value={{todos: todos, setTodos: setTodos}}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
