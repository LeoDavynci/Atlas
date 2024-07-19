import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { exerciseOptions, fetchData } from "@/utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
   const [search, setSearch] = useState("");
   const [bodyParts, setBodyparts] = useState([]);

   useEffect(() => {
      const fetchExercisesData = async () => {
         const bodyPartsData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
            exerciseOptions
         );

         setBodyparts(["all", ...bodyPartsData]);
      };

      fetchExercisesData();
   }, []);

   const handleSearch = async () => {
      if (search) {
         const exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises",
            exerciseOptions
         );

         console.log(exercisesData);

         const searchedExercises = exercisesData.filter(
            (item) =>
               item.name.toLowerCase().includes(search) ||
               item.target.toLowerCase().includes(search) ||
               item.equipment.toLowerCase().includes(search) ||
               item.bodyPart.toLowerCase().includes(search)
         );

         setSearch("");
         setExercises(searchedExercises);
      }
   };

   return (
      <>
         <div>
            {/* Search Bar */}
            <div className="testgreen w-full">
               <Input
                  className="light rounded-sm mfont4 border-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  placeholder="Search Exercises"
                  type="text"
               />
               <Button className="rounded-sm" onClick={handleSearch}>
                  <div className="flex flex-row justify-center items-center">
                     Search
                  </div>
               </Button>
            </div>

            {/*  Scroll Bar */}
            <div className="flex flex-row pt-40 px-6 w-full overflow-hidden">
               {bodyParts && bodyParts.length > 0 ? (
                  <HorizontalScrollBar
                     data={bodyParts}
                     bodyPart={bodyPart}
                     setBodyPart={setBodyPart}
                  />
               ) : (
                  <p>Loading body parts...</p>
               )}
            </div>
         </div>
      </>
   );
};

export default SearchExercises;
