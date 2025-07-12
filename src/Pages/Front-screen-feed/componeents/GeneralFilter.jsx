import React, { useState, useRef, useEffect } from 'react';

const GeneralFilter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const popupRef = useRef();

  const filters = [
    "Viewed me",
    "Groups / Blogs",
    "Speed Date",
    "Travel Plans",
    "Parties & Events",
  ];

  // Toggle popup visibility
  const togglePopup = () => setShowPopup(!showPopup);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="position-fixed top-25 right-0 d-inline-block" ref={popupRef}>
      
        <div className="filter-popup border rounded p-3 mt-2">
          {filters.map((filter) => (
            <div key={filter} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedFilters.includes(filter)}
                onChange={() => handleCheckboxChange(filter)}
                id={filter}
              />
              <label className="form-check-label text-white" htmlFor={filter}>
                {filter}
              </label>
            </div>
          ))}
        </div>
    </div>
  );
};

export default GeneralFilter;
