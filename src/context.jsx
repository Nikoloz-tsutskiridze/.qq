import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    getLocalStorage("darkTheme", true)
  );
  const [searchTerm, setSearchTerm] = useState("dog");

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    setLocalStorage("darkTheme", newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => useContext(AppContext);
