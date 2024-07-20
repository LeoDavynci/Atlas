import React from "react";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
   return (
      <div
         key={item.id || item}
         itemID={item.id || item}
         title={item.id || item}
         className="light p-2 mfont3 mr-2 flex-shrink-0 flex items-center justify-center cursor-pointer rounded-sm whitespace-nowrap"
         onClick={() => setBodyPart(item)}
         style={{
            backgroundColor: bodyPart === item ? "#594D93" : "",
            color: bodyPart === item ? "white" : "",
            minWidth: "fit-content",
            height: "40px", // Set a fixed height
         }}
      >
         <div className="truncate">{item.name || item}</div>
      </div>
   );
};

export default BodyPart;
