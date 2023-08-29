import React from "react";
import DashboardButton from "./DashboardButton";

const HorizontalScroll = ({ items }) => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap py-4 px-2">
      {items.map((item) => (
        <div className="px-2">
          <DashboardButton item={item} />
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;
