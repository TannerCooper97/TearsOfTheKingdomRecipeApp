import classes from "./Input.module.css";
import React from "react";

const SelectInput = React.forwardRef(({ options, value, onChange }, ref) => {
    return (
        <select ref={ref} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  });
  
  export default SelectInput;