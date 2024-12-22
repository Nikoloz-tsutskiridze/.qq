import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedDarkMode = localStorage.getItem("darkTheme") === "true";
    const isDarkTheme = storedDarkMode || prefersDarkMode;

    document.body.classList.toggle("dark-theme", isDarkTheme);

    return isDarkTheme;
  }
  return false;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("dog");
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
