import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ExerciseCard = ({ exercise, index, hide }) => {
   return (
      <Link to={`/exercise/id/${exercise.id}`}>
         <div
            key={`${exercise.id}-${index}`}
            className={`flex flex-col p-2 pb-4 border rounded-md gap-2 light m-1 ${
               hide ? "h-56 w-36" : "w-auto h-max"
            }`}
         >
            <img
               className="rounded-md"
               src={exercise.gifUrl}
               alt={exercise.name}
               loading="lazy"
            />
            <p className="mfont3">{exercise.name}</p>

            {!hide && (
               <Button className="accent rounded-sm mfont55 p-2 h-5 w-min">
                  <p>
                     {exercise.bodyPart}
                     {" > "}
                     {exercise.target}
                  </p>
               </Button>
            )}

            <p className="mfont5">Equipment: {exercise.equipment}</p>
         </div>
      </Link>
   );
};

export default ExerciseCard;
