import { useGlobalContext } from "./context";
import { useState, useEffect } from "react";
import axios from "axios";

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
      if (trimmedValue) {
        setSearchTerm(trimmedValue);
      }
    }, 1000);

    setDebounceTimer(timer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (!inputValue) return;

      try {
        await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${
            import.meta.env.VITE_API_KEY
          }&query=${inputValue}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [inputValue]);

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
