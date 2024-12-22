import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handleInputChange = (e) => {
    const searchValue = e.target.value.trim();
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form">
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="Search images..."
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
};

export default SearchForm;
