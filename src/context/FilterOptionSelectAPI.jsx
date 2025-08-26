// contexts/FormContext.js
// contexts/FilterContext.js
import { createContext, useState } from "react";

export const FilterOptionselect = createContext();

export const FormProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState(""); // <-- just a string

  console.log("xxxxx", filterOption);

  return (
    <FilterOptionselect.Provider value={{ filterOption, setFilterOption }}>
      {children}
    </FilterOptionselect.Provider>
  );
};
