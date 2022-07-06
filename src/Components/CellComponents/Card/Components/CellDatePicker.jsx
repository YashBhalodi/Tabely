import React, { forwardRef } from "react";

import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import parseISO from "date-fns/parseISO";
import { useCell, useBoard } from "Hooks";
import { FiCalendar, FiXCircle } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = forwardRef(
  ({ themeItem, date, updateFields, isEditMode, onClick }, ref) => {
    const getDateString = () => {
      if (date) {
        const d = new Date(date);
        return d.toDateString();
      }
      return "";
    };

    const clearDate = (e) => {
      e.stopPropagation();
      updateFields({ date: null });
    };

    return (
      <div
        className={`flex flex-row space-x-2 items-center w-full min-h-[42px] rounded-md ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} ${themeItem.darkTextColor} border mix-blend-multiply p-2 cursor-pointer hover:mix-blend-normal transition`}
        onClick={onClick}
        ref={ref}
      >
        <FiCalendar className={`text-xl opacity-30`} />
        <div className="flex-1">{getDateString()}</div>
        {getDateString() && isEditMode ? (
          <FiXCircle
            className={`text-xl opacity-30 hover:opacity-70`}
            onClick={clearDate}
          />
        ) : null}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";

const CellDatePicker = (props) => {
  const { cellId } = props;
  const { cellData, updateFields } = useCell({ id: cellId });
  const { boardId } = useParams();
  const { isEditMode } = useBoard({ id: boardId });
  const { colorTheme, date } = cellData;
  const themeItem = COLOR_THEME[colorTheme] || COLOR_THEME.STONE;

  const handleDateChange = (e) => {
    updateFields({ date: e });
  };

  const selectedDate = !isNaN(parseISO(date)) ? parseISO(date) : undefined;

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      customInput={
        <DateInput
          themeItem={themeItem}
          updateFields={updateFields}
          date={date}
          isEditMode={isEditMode}
        />
      }
      readOnly={!isEditMode}
    />
  );
};
CellDatePicker.displayName = "CellDatePicker";

export default React.memo(CellDatePicker);
