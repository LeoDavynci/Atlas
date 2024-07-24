import React, { useEffect, useState } from "react";

import Exercises from "@/components/Exercises";
import SearchExercises from "@/components/SearchExercises";

const SearchPage = () => {
   const [exercises, setExercises] = useState([]);
   const [bodyPart, setBodyPart] = useState("all");
   const [equipment, setEquipment] = useState("all");

   return (
      <>
         {/*  Search Bar + Horizontal Scroll Bar */}
         <div className="z-10 flex flex-col fixed top-0 left-0 right-0 h-68 w-full bg-custom-accent rounded-b-lg p-6 outershadow">
            <h1 className="mfont1">Home</h1>

            <SearchExercises
               setExercises={setExercises}
               bodyPart={bodyPart}
               setBodyPart={setBodyPart}
               equipment={equipment}
               setEquipment={setEquipment}
            />
         </div>

         {/* Exercises */}
         <div className="p-6 h-full pt-64">
            <Exercises
               exercises={exercises}
               setExercises={setExercises}
               bodyPart={bodyPart}
               equipment={equipment}
            />
         </div>
      </>
   );
};

export default SearchPage;
