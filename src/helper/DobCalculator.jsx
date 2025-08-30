import React from "react";

const AgeCalculator = ({ birthDate }) => {
  if (!birthDate) return <span>Unknown</span>;

  const calculateAge = (dob) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return <span>{calculateAge(birthDate)}</span>;
};

export default AgeCalculator;
