import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import BodyPart from "./BodyPart";
import ExerciseCard from "./ExerciseCard";

const HorizontalScrollBar = ({
   data = [],
   isBodyParts,
   isEquipment,
   filter,
   setFilter,
   hide,
}) => {
   const [scrollPosition, setScrollPosition] = useState(0);
   const containerRef = useRef(null);
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [scrollLeft, setScrollLeft] = useState(0);

   const scroll = (direction) => {
      const container = containerRef.current;
      if (container) {
         const scrollAmount = direction === "left" ? -200 : 200;
         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
         setScrollPosition(container.scrollLeft + scrollAmount);
      }
   };

   const onMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
   };

   const onMouseUp = () => {
      setIsDragging(false);
   };

   const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
      setScrollPosition(containerRef.current.scrollLeft);
   };

   const onTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
   };

   const onTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
      setScrollPosition(containerRef.current.scrollLeft);
   };

   useEffect(() => {
      const container = containerRef.current;
      if (container) {
         container.addEventListener("touchstart", onTouchStart);
         container.addEventListener("touchmove", onTouchMove);
         container.addEventListener("touchend", onMouseUp);
         return () => {
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onMouseUp);
         };
      }
   }, [isDragging, startX, scrollLeft]);

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
            className="flex overflow-hidden h-full cursor-grab active:cursor-grabbing"
            style={{
               scrollBehavior: "smooth",
               width: "calc(100% - 80px)",
               userSelect: "none",
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
         >
            {Array.isArray(data) &&
               data.map((item, index) => (
                  <div key={item.id || item.name || index}>
                     {isBodyParts ? (
                        <BodyPart
                           item={item}
                           filter={filter}
                           setFilter={setFilter}
                        />
                     ) : isEquipment ? (
                        <BodyPart
                           item={item}
                           filter={filter}
                           setFilter={setFilter}
                        />
                     ) : (
                        <ExerciseCard exercise={item} hide={hide} />
                     )}
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
