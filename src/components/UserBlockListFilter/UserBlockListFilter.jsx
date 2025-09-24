import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterComponent = () => {
  return (
    <div className="container-fluid p-3 bg-light border rounded" style={{ maxWidth: '300px' }}>
      {/* Filter Header */}
      <div className="mb-3">
        <h6 className="fw-bold text-dark mb-0">Filter</h6>
      </div>

      {/* Block Member Section */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="text-dark">Block Member</span>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              id="blockMemberSwitch"
            />
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-3">
        <div className="mb-2">
          <span className="text-dark">Search</span>
        </div>
        <div className="input-group input-group-sm">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
      </div>

      {/* OK Button */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary btn-sm px-3">
          OK
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;