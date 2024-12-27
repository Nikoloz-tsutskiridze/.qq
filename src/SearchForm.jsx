import { useGlobalContext } from "./context";
import { useState } from "react";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    clearTimeout(window.debounceTimeout);
    window.debounceTimeout = setTimeout(() => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        setSearchTerm(trimmedValue);
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = inputValue.trim();
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
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
