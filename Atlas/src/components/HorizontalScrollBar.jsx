import React, { useState, useRef } from "react";
import { Button } from "./ui/button";

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart }) => {
   const [scrollPosition, setScrollPosition] = useState(0);
   const containerRef = useRef(null);

   const scroll = (direction) => {
      const container = containerRef.current;
      if (container) {
         const scrollAmount = direction === "left" ? -200 : 200;
         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
         setScrollPosition(container.scrollLeft + scrollAmount);
      }
   };

   return (
      <div className="flex items-center w-full gap-2">
         <Button
            onClick={() => scroll("left")}
            className="accentbutton w-5"
            disabled={scrollPosition <= 0}
         >
            ←
         </Button>

         <div
            ref={containerRef}
            className="flex overflow-hidden h-full"
            style={{
               scrollBehavior: "smooth",
               width: "calc(100% - 80px)", // Adjust based on arrow button sizes
            }}
         >
            {data.map((item) => (
               <div
                  key={item.id || item}
                  itemID={item.id || item}
                  title={item.id || item}
                  className="light p-2 mfont3 mr-2 flex-shrink-0 flex items-center cursor-pointer rounded-sm"
                  onClick={() => setBodyPart(item)}
                  style={{
                     backgroundColor: bodyPart === item ? "#594D93" : "",
                     color: bodyPart === item ? "white" : "",
                  }}
               >
                  <div>{item.name || item}</div>
               </div>
            ))}
         </div>

         <Button
            onClick={() => scroll("right")}
            className="accentbutton w-5"
            disabled={
               scrollPosition >=
               containerRef.current?.scrollWidth -
                  containerRef.current?.clientWidth
            }
         >
            →
         </Button>
      </div>
   );
};

export default HorizontalScrollBar;
