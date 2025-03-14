import React, { useState } from "react";

const RangeComponent = ({ onRangeChange }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(250);

  const handleFromChange = (e) => {
    const newFrom = Number(e.target.value) || 0;
    setFrom(newFrom);
    onRangeChange({ from: newFrom, to });
  };

  const handleToChange = (e) => {
    const newTo = Number(e.target.value) || 250;
    setTo(newTo);
    onRangeChange({ from, to: newTo });
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <label htmlFor="from" className="text-sm font-semibold">
          From
        </label>
        <input
          type="number"
          id="from"
          name="from"
          className="border border-accents rounded-md p-2 w-full"
          placeholder="0"
          value={from}
          onChange={handleFromChange}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="to" className="text-sm font-semibold">
          To
        </label>
        <input
          type="number"
          id="to"
          name="to"
          className="border border-accents rounded-md p-2 w-full"
          placeholder="250.00"
          value={to}
          onChange={handleToChange}
        />
      </div>
    </div>
  );
};

export default RangeComponent;
