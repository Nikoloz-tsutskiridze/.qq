import { useGlobalContext } from "./context";
import { useState, useEffect } from "react";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const [inputValue, setInputValue] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      const trimmedValue = value.trim();
      setSearchTerm(trimmedValue);
    }, 1000);

    setDebounceTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form">
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="Search images..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
};

export default SearchForm;
