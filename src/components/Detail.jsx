import React from "react";

const Detail = ({ exerciseDetail }) => {
   const { instructions, secondaryMuscles, gifUrl, name, target, equipment } =
      exerciseDetail;

   const secondaryMusclesList = secondaryMuscles
      ? secondaryMuscles.join(", ")
      : "";
   return (
      <div className="flex flex-col pb-5 bg-white rounded-b-lg">
         <div className=" flex w-full h-72 bg-white rounded-b-lg justify-center">
            <img className="h-72" src={gifUrl} alt={name} loading="lazy" />
         </div>
         <div className="px-6">
            <p className="mfont27">{name}</p>
            <p className="mfont47 pt-3">Equipment: {equipment}</p>
            <p className="mfont47 pt-1">Primary: {target}</p>
            {secondaryMusclesList && (
               <p className="mfont47 pt-1">Secondary: {secondaryMusclesList}</p>
            )}
            {instructions && instructions.length > 0 && (
               <div className="mfont47 pt-3">
                  <p className="font-bold">Instructions:</p>
                  <ol className="list-decimal pl-5 pt-1">
                     {instructions.map((instruction, index) => (
                        <li key={index} className="pt-1">
                           {instruction}
                        </li>
                     ))}
                  </ol>
               </div>
            )}
         </div>
      </div>
   );
};

export default Detail;
