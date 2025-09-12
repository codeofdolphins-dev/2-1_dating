import React, { useEffect, useState } from "react";

const PaginationWithSelector = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalCount,
  apiTotalPages,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPageOptions = [3, 6, 9];

  // ✅ Calculate total pages when totalCount or itemsPerPage changes
  useEffect(() => {
    if (totalCount !== null ) {
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } else if (apiTotalPages !== null ) {
      setTotalPages(apiTotalPages);
    } else {
      setTotalPages(1);
    }
  }, [totalCount, apiTotalPages, itemsPerPage]);

  // Limit pagination buttons to 10 max, or totalPages if fewer
  const pages = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  return (
    <>
      {/* Items Per Page Selector */}
      <div className="d-flex justify-content-start align-items-center gap-2 my-3">
        <label className="text-white mb-0">Items per page:</label>
        <select
          className="form-select form-select-sm w-auto"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
        >
          {itemsPerPageOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <nav style={{ marginTop: 0 }}>
        <ul className="pagination pagination-sm justify-start-center mt-3 mb-0 gap-2 pb-5">
          {/* Prev Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill px-3"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>

          {/* Page Numbers */}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link rounded-pill"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill px-3"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationWithSelector;
