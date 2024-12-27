import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
import { usePagination } from "./hooks/usePagination";
import Modal from "./components/Modal";
import { useDebounce } from "use-debounce";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { page, nextPage, prevPage } = usePagination();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images", debouncedSearchTerm, page],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${
          import.meta.env.VITE_API_KEY
        }&query=${debouncedSearchTerm}&page=${page}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <h4 className="loading"></h4>;
  }

  if (isError) {
    return <h4>Error: {error.message}</h4>;
  }

  const results = data?.results || [];

  return (
    <>
      <section className="image-container">
        {results.length > 0 ? (
          results.map((item) => (
            <img
              src={item.urls.regular}
              key={item.id}
              alt={item.alt_description || "Image"}
              className="img"
              onClick={() => setSelectedPhoto(item)}
            />
          ))
        ) : (
          <h4>No results found. Try another search!</h4>
        )}
      </section>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {data?.total_pages || 1}
        </span>
        <button
          onClick={() => nextPage(data?.total_pages || 1)}
          disabled={data?.total_pages && page === data.total_pages}
        >
          Next
        </button>
      </div>

      <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <>
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
                <strong>Likes:</strong> {selectedPhoto.likes}
              </p>
              <p>
                <strong>Photographer:</strong>{" "}
                <a
                  href={selectedPhoto.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedPhoto.user.name}
                </a>
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
