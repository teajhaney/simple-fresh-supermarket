import React from "react";

const RangeComponent = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <label name="from" className="text-sm font-semibold">
          From
        </label>
        <input
          type="number"
          id="from"
          name="from"
          className="border border-accents rounded-md p-2 w-full"
          placeholder="0"
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
          placeholder="240.00"
        />
      </div>
    </div>
  );
};

export default RangeComponent;
