import React, { useEffect, useState } from "react";

import Exercises from "@/components/Exercises";
import SearchExercises from "@/components/SearchExercises";

const SearchPage = () => {
   const [exercises, setExercises] = useState([]);
   const [bodyPart, setBodyPart] = useState("all");

   return (
      <>
         {/*  Search Bar + Horizontal Scroll Bar */}
         <div className="z-10 flex flex-col fixed top-0 left-0 right-0 h-36 w-full bg-custom-accent rounded-b-lg p-6 outershadow">
            <h1 className="mfont1">Explore</h1>
            <div className="flex flex-row gap-2 h-16 pt-2 mfont4 ">
               <SearchExercises
                  setExercises={setExercises}
                  bodyPart={bodyPart}
                  setBodyPart={setBodyPart}
               />
            </div>
         </div>

         {/* Exercises */}
         <div className="p-6 h-full">
            <Exercises
               setExercises={setExercises}
               bodyPart={bodyPart}
               exercises={exercises}
            />
         </div>
      </>
   );
};

export default SearchPage;
