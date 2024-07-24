import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { exerciseOptions, fetchData } from "@/utils/fetchData";
import { Button } from "./ui/button";

const Exercises = ({ exercises, setExercises, bodyPart, equipment }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [exercisesPerPage] = useState(12);
   const [loading, setLoading] = useState(true);
   const [filteredExercises, setFilteredExercises] = useState([]);

   useEffect(() => {
      const fetchExercisesData = async () => {
         setLoading(true);
         const exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0",
            exerciseOptions
         );
         setExercises(exercisesData);
         setLoading(false);
      };

      fetchExercisesData();
   }, [setExercises]);

   useEffect(() => {
      if (exercises.length > 0) {
         const filtered = exercises.filter(
            (exercise) =>
               (bodyPart === "all" || exercise.bodyPart === bodyPart) &&
               (equipment === "all" || exercise.equipment === equipment)
         );
         setFilteredExercises(filtered);
         setCurrentPage(1);
      }
   }, [exercises, bodyPart, equipment]);

   // Get current exercises
   const indexOfLastExercise = currentPage * exercisesPerPage;
   const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
   const currentExercises = filteredExercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
   );

   // Calculate total pages
   const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

   // Change page
   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="container mx-auto">
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {currentExercises.map((exercise, index) => (
               <ExerciseCard
                  key={`${exercise.id}-${index}`}
                  exercise={exercise}
               />
            ))}
         </div>
         <div className="flex justify-center mt-4 gap-4 items-center">
            <Button
               onClick={() => paginate(currentPage - 1)}
               disabled={currentPage === 1}
               className="accentbutton"
            >
               ←
            </Button>
            <span className="mfont35">
               Page {currentPage} of {totalPages}
            </span>
            <Button
               onClick={() => paginate(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="accentbutton"
            >
               →
            </Button>
         </div>
         {/* Buffer */}
         <div className="pt-14"></div>
      </div>
   );
};

export default Exercises;
