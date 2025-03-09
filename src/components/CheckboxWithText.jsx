import React, { useState } from "react";

const CheckboxWithText = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="w-3 h-3 accent-primary cursor-pointer border border-tertiary"
      />
      <span className="text-tertiary text-sm">{label}</span>
    </label>
  );
};

export default CheckboxWithText;
