import React from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SimilarExercises = ({ targetMuscleExercises }) => {
   return (
      <div className="flex flex-col gap-2">
         <p className="mfont25">Similar Exercises</p>
         <div>
            {targetMuscleExercises.length ? (
               <HorizontalScrollBar data={targetMuscleExercises} hide />
            ) : (
               "Loading..."
            )}
         </div>
      </div>
   );
};

export default SimilarExercises;
