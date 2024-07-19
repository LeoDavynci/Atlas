import React, { useEffect } from "react";
import ExerciseCard from "./ExerciseCard";
import { exerciseOptions, fetchData } from "@/utils/fetchData";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
   useEffect(() => {
      const fetchExercisesData = async () => {
         let exercisesData = [];
         if (bodyPart === "all") {
            exercisesData = await fetchData(
               `https://exercisedb.p.rapidapi.com/exercises`,
               exerciseOptions
            );
         } else {
            exercisesData = await fetchData(
               `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
               exerciseOptions
            );
         }
         setExercises(exercisesData); // Update the exercises state
      };

      fetchExercisesData();
   }, [bodyPart, setExercises]);

   return (
      <div className="container mx-auto px-4">
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {exercises.map((exercise, index) => (
               <ExerciseCard
                  key={`${exercise.id}-${index}`}
                  exercise={exercise}
               />
            ))}
         </div>
      </div>
   );
};

export default Exercises;
