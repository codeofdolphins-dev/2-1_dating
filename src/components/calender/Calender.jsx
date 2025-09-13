import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function toUtcISOString(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(Date.UTC(year, month, day)).toISOString();
}

const MyCalendar = ({ setFormatted, className }) => {
    const [value, setValue] = useState([new Date(), new Date()]);

    const handleChange = (newValue) => {
        setValue(newValue);

        const formattedValue = Array.isArray(newValue)
            ? newValue.map(toUtcISOString).join(' to ')
            : toUtcISOString(newValue);

        setFormatted(formattedValue);
    };

    return <Calendar
        onChange={handleChange}
        value={value}
        selectRange={true}
        // showDoubleView={true}
        minDate={new Date()}
        className={className}
    />
};

export default MyCalendar;
