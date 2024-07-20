import React from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SimilarExercises = ({ targetMuscleExercises }) => {
   return (
      <div className="testred">
         <p className="mfont25">Similar Exercises</p>
         <div>
            {targetMuscleExercises.length ? (
               <HorizontalScrollBar data={targetMuscleExercises} />
            ) : (
               "Loading"
            )}
         </div>
      </div>
   );
};

export default SimilarExercises;
