import React, {  } from "react";

const CheckboxWithText = ({ label, checked, onChange }) => {


  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-3 h-3 accent-primary cursor-pointer border border-tertiary"
      />
      <span className="text-tertiary text-sm">{label}</span>
    </label>
  );
};

export default CheckboxWithText;
