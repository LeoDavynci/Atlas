import React from "react";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
   console.log(exercises);
   return (
      <div className="container mx-auto px-4">
         <h2 className="text-2xl font-bold mb-6">Results</h2>
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
