import React, { useState, useEffect } from "react";

import { exerciseOptions, fetchData } from "@/utils/fetchData";

const Exercises = ({ setExercises, bodyPart, exercises }) => {
   console.log(exercises);
   return (
      <div>
         <p>Results</p>
         {exercises.map((exercise, index) => (
            <p>{exercise.name}</p>
         ))}
      </div>
   );
};

export default Exercises;
