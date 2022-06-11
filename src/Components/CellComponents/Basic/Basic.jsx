import React from "react";

import { useCell } from "Hooks";

const Basic = ({ cellId }) => {
  const { cellData, updateFields, clearCell } = useCell({ id: cellId });
  const { title = "" } = cellData;

  const handleTextChange = (e) => {
    updateFields({
      title: e.target.value,
    });
  };

  return (
    <td>
      <div className="group hover:bg-blue-800 hover:shadow-xl flex flex-col w-56 h-24 px-4 py-4 text-gray-100 transition-all bg-blue-900 rounded-md">
        <textarea
          type={"text"}
          name="title"
          value={title}
          onChange={handleTextChange}
          rows={3}
          className="group-hover:bg-blue-800 scrollbar text-gray-100 transition-all bg-blue-900 outline-none resize-none"
        />
      </div>
    </td>
  );
};

export default Basic;
