import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { exerciseOptions, fetchData } from "@/utils/fetchData";
import { Button } from "./ui/button";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [exercisesPerPage] = useState(12);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchExercisesData = async () => {
         setLoading(true);
         let exercisesData = [];
         if (bodyPart === "all") {
            exercisesData = await fetchData(
               `https://exercisedb.p.rapidapi.com/exercises?limit=1000`,
               exerciseOptions
            );
         } else {
            exercisesData = await fetchData(
               `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1000`,
               exerciseOptions
            );
         }
         setExercises(exercisesData);
         setLoading(false);
         setCurrentPage(1);
      };

      fetchExercisesData();
   }, [bodyPart, setExercises]);

   // Only proceed with pagination if exercises is defined and not empty
   if (!exercises || exercises.length === 0) {
      return <div>No exercises found.</div>;
   }

   // Get current exercises
   const indexOfLastExercise = currentPage * exercisesPerPage;
   const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
   const currentExercises = exercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
   );

   // Calculate total pages
   const totalPages = Math.ceil(exercises.length / exercisesPerPage);

   // Change page
   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="container mx-auto px-4">
         <h2 className="text-2xl font-bold mb-6">Results</h2>
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <span className="mfont3">
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
      </div>
   );
};

export default Exercises;
