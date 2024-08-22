// Import necessary hooks and functions from React
import { useState, createContext, useContext } from "react";

// Import the MySnackBar component which will display the toast notifications
import MySnackBar from "../Components/MySnackBar";

// Create a context for the toast notifications. This will allow components within the provider to access the context.
export const ToastContext = createContext({});

// Define the ToastProvider component that will wrap around any component needing access to the toast context.
export const ToastProvider = ({ children }) => {
  // State to control whether the toast is open or closed
  const [open, setOpen] = useState(false);

  // State to store the message that will be displayed in the toast
  const [message, setMessage] = useState("");

  // Function to show the toast with a message and then hide it after 2 seconds
  function showHideToast(message) {
    setOpen(true); // Open the toast
    setMessage(message); // Set the message to be displayed
    setTimeout(() => {
      setOpen(false); // Close the toast after 2 seconds
    }, 2000);
  }

  return (
    // Provide the showHideToast function to the entire tree within the ToastContext.Provider
    <ToastContext.Provider value={{ showHideToast: showHideToast }}>
      {/* Render the MySnackBar component with the current state of open and message */}
      <MySnackBar open={open} message={message} />
      {/* Render any children passed to this provider */}
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};

