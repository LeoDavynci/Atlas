import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { exerciseOptions, fetchData } from "@/utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({
   setExercises,
   bodyPart,
   setBodyPart,
   equipment,
   setEquipment,
}) => {
   const [search, setSearch] = useState("");
   const [bodyParts, setBodyParts] = useState([]);
   const [equipments, setEquipments] = useState([]);

   useEffect(() => {
      const fetchExercisesData = async () => {
         const bodyPartsData = await fetchData(
            "https://workoutdb1.p.rapidapi.com/exercise/bodyPartList",
            exerciseOptions
         );

         const equipmentData = await fetchData(
            "https://workoutdb1.p.rapidapi.com/exercise/equipmentList",
            exerciseOptions
         );

         setBodyParts(["all", ...bodyPartsData]);
         setEquipments(["all", ...equipmentData]);
      };

      fetchExercisesData();
   }, []);

   const handleSearch = async () => {
      if (search) {
         try {
            const exercisesData = await fetchData(
               `https://workoutdb1.p.rapidapi.com/exercise/all`,
               exerciseOptions
            );

            const searchedExercises = exercisesData.filter(
               (item) =>
                  item.name.toLowerCase().includes(search) ||
                  item.target.toLowerCase().includes(search) ||
                  item.equipment.toLowerCase().includes(search) ||
                  item.bodyPart.toLowerCase().includes(search)
            );

            setExercises(searchedExercises);
            setSearch("");
         } catch (error) {
            console.error("Error fetching exercises:", error);
         }
      } else {
         setExercises(exercisesData);
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
                     filter={bodyPart}
                     setFilter={setBodyPart}
                     isBodyParts
                  />
               ) : (
                  <p>Loading body parts...</p>
               )}
            </div>

            {/* Scroll Bar for Equipment */}
            <div className="flex flex-row w-full overflow-hidden">
               {equipments && equipments.length > 0 ? (
                  <HorizontalScrollBar
                     data={equipments}
                     filter={equipment}
                     setFilter={setEquipment}
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
