import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css'; // 👈 We'll create this next

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="container mt-4">
      <label className="form-label fw-bold text-white">When</label>
      <div className="p-2 border border-primary rounded-3 custom-datepicker-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          calendarClassName="dark-theme-calendar"
        />
      </div>
    </div>
  );
};

export default Calender;
