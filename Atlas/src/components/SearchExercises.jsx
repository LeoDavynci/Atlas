import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { exerciseOptions, fetchData } from "@/utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
   const [search, setSearch] = useState("");
   const [bodyParts, setBodyParts] = useState([]);
   const [targets, setTargets] = useState([]);
   const [equipment, setEquipment] = useState([]);

   useEffect(() => {
      const fetchExercisesData = async () => {
         const bodyPartsData = await fetchData(
            "https://workoutdb1.p.rapidapi.com/exercise/bodyPartList",
            exerciseOptions
         );
         const targetsData = await fetchData(
            "https://workoutdb1.p.rapidapi.com/exercise/targetList",
            exerciseOptions
         );
         const equipmentData = await fetchData(
            "https://workoutdb1.p.rapidapi.com/exercise/equipmentList",
            exerciseOptions
         );

         setBodyParts(["all", ...bodyPartsData]);
         setTargets(["all", ...targetsData]);
         setEquipment(["all", ...equipmentData]);
      };

      fetchExercisesData();
   }, []);

   const handleSearch = async () => {
      if (search) {
         try {
            let allExercises = [];
            let page = 1;
            let hasMorePages = true;

            while (hasMorePages) {
               const exercisesData = await fetchData(
                  `https://workoutdb1.p.rapidapi.com/exercise/name/${search}?limit=10&page=${page}`,
                  exerciseOptions
               );

               if (exercisesData.length > 0) {
                  allExercises = [...allExercises, ...exercisesData];
                  page++;
               } else {
                  hasMorePages = false;
               }

               // Optional: break after a certain number of pages to avoid too many API calls
               if (page > 5) break;
            }

            setExercises(allExercises);
            setSearch("");
         } catch (error) {
            console.error("Error fetching exercises:", error);
         }
      }
   };

   return (
      <>
         <div className="flex flex-col gap-3">
            {/* Search Bar */}
            <div className="w-full flex flex-row gap-3 h-12 pt-2 mfont4">
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

            {/* Scroll Bar for Body Parts */}
            <div className="flex flex-row w-full overflow-hidden">
               {bodyParts && bodyParts.length > 0 ? (
                  <HorizontalScrollBar
                     data={bodyParts}
                     bodyPart={bodyPart}
                     setBodyPart={setBodyPart}
                     isBodyParts
                  />
               ) : (
                  <p>Loading body parts...</p>
               )}
            </div>

            {/* Scroll Bar for Targets */}
            <div className="flex flex-row w-full overflow-hidden">
               {targets && targets.length > 0 ? (
                  <HorizontalScrollBar
                     data={targets}
                     bodyPart={bodyPart}
                     setBodyPart={setBodyPart}
                     isTargets
                  />
               ) : (
                  <p>Loading targets...</p>
               )}
            </div>

            {/* Scroll Bar for Equipment */}
            <div className="flex flex-row w-full overflow-hidden">
               {equipment && equipment.length > 0 ? (
                  <HorizontalScrollBar
                     data={equipment}
                     bodyPart={bodyPart}
                     setBodyPart={setBodyPart}
                     isEquipment
                  />
               ) : (
                  <p>Loading equipment...</p>
               )}
            </div>
         </div>
      </>
   );
};

export default SearchExercises;
