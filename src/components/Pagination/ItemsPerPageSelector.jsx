import React from "react";

const ItemsPerPageSelector = ({ itemsPerPage, setItemsPerPage, setCurrentPage }) => {
  const options = [3, 6, 9];

  const handleChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  return (
    <div className="d-flex justify-content-start align-items-center gap-2 my-3">
      <label className="text-white mb-0">Items per page:</label>
      <select
        className="form-select form-select-sm w-auto"
        value={itemsPerPage}
        onChange={handleChange}
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
