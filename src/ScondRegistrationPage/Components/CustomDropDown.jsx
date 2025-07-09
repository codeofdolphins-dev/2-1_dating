import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';

const CustomDropdown = () => {
  const selectRef = useRef(null);

  const handleArrowClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  return (
    <div className="col-lg-6 c">
      <div className="position-relative">
        <Form.Select
          ref={selectRef}
          className="text-white border-secondary border-2 border-top-0 border-start-0 border-end-0 rounded-0 pe-5"
          style={{
            backgroundColor: '#34393e',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            paddingRight: '2.5rem',
            color: '#fff'
          }}
          aria-label="Default select example"
        >
          <option>Straight</option>
          <option value="1">Bi-sexual</option>
          <option value="2">Bi-curious</option>
          <option value="3">Gay</option>
          <option value="4">Pansexual</option>
        </Form.Select>

        {/* Custom dropdown arrow */}
        
      </div>
    </div>
  );
};

export default CustomDropdown;
