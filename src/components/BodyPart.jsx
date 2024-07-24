import React from "react";

const BodyPart = ({ item, filter, setFilter }) => {
   const handleClick = () => {
      setFilter(item);
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
   };

   return (
      <div
         key={item.id || item}
         itemID={item.id || item}
         title={item.id || item}
         className="light p-2 mfont3 mr-2 flex-shrink-0 flex items-center justify-center cursor-pointer rounded-sm whitespace-nowrap"
         onClick={handleClick}
         style={{
            backgroundColor: filter === item ? "#594D93" : "",
            color: filter === item ? "white" : "",
            minWidth: "fit-content",
            height: "40px", // Set a fixed height
         }}
      >
         <div className="truncate">{item.name || item}</div>
      </div>
   );
};

export default BodyPart;
