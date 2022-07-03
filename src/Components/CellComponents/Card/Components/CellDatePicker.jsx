import React, { forwardRef } from "react";

import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import parseISO from "date-fns/parseISO";
import { useCell, useBoard } from "Hooks";
import { FiCalendar, FiXCircle } from "react-icons/fi";

import { COLOR_THEME } from "Utils/colors";
import "react-datepicker/dist/react-datepicker.css";

const DAY_INDEX = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

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

  const DateInput = forwardRef(({ value, onClick }, ref) => {
    const getDateString = () => {
      if (value) {
        const d = new Date(value);
        return value + " " + DAY_INDEX[d?.getDay()];
      }
      return "";
    };

    const clearDate = (e) => {
      e.stopPropagation();
      updateFields({ date: null });
    };

    return (
      <div
        className={`flex flex-row space-x-2 items-center w-full min-h-[42px] rounded-md ${themeItem.lightBgColor} ${themeItem.lightBgBorderColor} ${themeItem.darkTextColor} border mix-blend-multiply p-2`}
        onClick={onClick}
        ref={ref}
      >
        <FiCalendar className={`text-xl`} />
        <div className="flex-1">{getDateString()}</div>
        {getDateString() && isEditMode ? (
          <FiXCircle className={`text-xl opacity-30`} onClick={clearDate} />
        ) : null}
      </div>
    );
  });

  const selectedDate = !isNaN(parseISO(date)) ? parseISO(date) : undefined;

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      customInput={<DateInput />}
      readOnly={!isEditMode}
    />
  );
};

export default React.memo(CellDatePicker);
