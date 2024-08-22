import * as React from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// OTHERS
import { useState } from "react";
import { TodosContext } from "./Context/todosContext";
import { ToastProvider } from "./Context/ToastContext";

// Import UUID for generating unique IDs
import { v4 as uuidv4 } from "uuid";


const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"],
  },

  palette: {
    primary: {
      main: "#004d40",
    },
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
  // State for managing the list of todos
  const [todos, setTodos] = useState(initialTodos);

  return (
    // Apply the Material-UI theme using ThemeProvider to style the components
    <ThemeProvider theme={theme}>
      {/* Wrap the entire application in the ToastProvider to make toast notifications available throughout */}
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",           // Center the content horizontally
            justifyContent: "center",  // Center the content horizontally
            alignItems: "center",      // Center the content vertically
            height: "100vh",           // Make the app take up the full height of the viewport
            fontFamily: "Roboto",      // Set the font to Roboto
          }}
        >
          {/* Provide the todos state and the setTodos function to the context so that any component within TodosContext can access and update todos */}
          <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            {/* Render the TodoList component which will display the list of todos */}
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}


export default App;
