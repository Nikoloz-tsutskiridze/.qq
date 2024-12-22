import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    let storedDarkMode = localStorage.getItem("darkTheme");

    if (storedDarkMode === null) {
      storedDarkMode = "true";
      localStorage.setItem("darkTheme", storedDarkMode);
    }

    const isDarkTheme = storedDarkMode === "true";
    document.body.classList.toggle("dark-theme", isDarkTheme);

    return isDarkTheme;
  }
  return true;
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
