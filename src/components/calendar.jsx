import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";

function TodoCalendar({ todos , isDarkMode}) {
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasDeadline = todos.some((todo) => {
        const todoDate = new Date(todo.deadline);
        return (
          date.getDate() === todoDate.getDate() &&
          date.getMonth() === todoDate.getMonth() &&
          date.getFullYear() === todoDate.getFullYear()
        );
      });

      return hasDeadline ? (
        <div className="flex items-center">
          <div className="h-1 w-1 bg-red-500 rounded-full mx-auto dot"></div>
        </div>
      ) : null;
    }
  };

  return (
    <div className="flex">
      <Calendar
        tileContent={tileContent}
        className={` ${isDarkMode ? "custom-calendar" : "" }`}
      />
    </div>
  );
}

export default TodoCalendar;
