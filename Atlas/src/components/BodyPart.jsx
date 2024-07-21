import React from "react";

const BodyPart = ({ item, bodyPart, setBodyPart, isTarget, isEquipment }) => {
   const handleClick = () => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
   };

   // const getPrefix = () => {
   //    if (isTarget) return "Target: ";
   //    if (isEquipment) return "Equipment: ";
   //    return "";
   // };

   return (
      <div
         key={item.id || item}
         itemID={item.id || item}
         title={item.id || item}
         className="light p-2 mfont3 mr-2 flex-shrink-0 flex items-center justify-center cursor-pointer rounded-sm whitespace-nowrap"
         onClick={handleClick}
         style={{
            backgroundColor: bodyPart === item ? "#594D93" : "",
            color: bodyPart === item ? "white" : "",
            minWidth: "fit-content",
            height: "40px", // Set a fixed height
         }}
      >
         <div className="truncate">
            {/* {getPrefix()} */}
            {item.name || item}
         </div>
      </div>
   );
};

export default BodyPart;
