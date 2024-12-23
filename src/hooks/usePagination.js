import { useState } from "react";

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const nextPage = (totalPages) => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return { page, nextPage, prevPage };
};
