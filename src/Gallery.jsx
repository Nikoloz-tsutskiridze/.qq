import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useState } from "react";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", searchTerm, page],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${
          import.meta.env.VITE_API_KEY
        }&query=${searchTerm}&page=${page}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.total_pages && page < data.total_pages)
      setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = data?.results || [];
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found. Please type something to search!</h4>
      </section>
    );
  }

  return (
    <>
      <section className="image-container">
        {results.map((item) => (
          <img
            src={item.urls.regular}
            key={item.id}
            alt={item.alt_description || "Image"}
            className="img"
            onClick={() => setSelectedPhoto(item)}
          />
        ))}
      </section>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {data?.total_pages || 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={data?.total_pages && page === data.total_pages}
        >
          Next
        </button>
      </div>

      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <img
              src={selectedPhoto.urls.full}
              alt={selectedPhoto.alt_description || "Image"}
              className="full-img"
            />
            <div className="photo-details">
              <p>
                <strong>Description:</strong>{" "}
                {selectedPhoto.description || "N/A"}
              </p>
              <p>
                <strong>Alt Text:</strong>{" "}
                {selectedPhoto.alt_description || "N/A"}
              </p>
              <p>
                <strong>Likes:</strong> {selectedPhoto.likes}
              </p>
              <p>
                <strong>Photographer:</strong>
                <a
                  href={selectedPhoto.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photographer"
                >
                  {selectedPhoto.user.name}
                </a>
              </p>
              <p>
                <strong>Resolution:</strong> {selectedPhoto.width}x
                {selectedPhoto.height}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
