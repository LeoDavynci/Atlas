import React from "react";

const Detail = ({ exerciseDetail }) => {
   const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;
   return (
      <div className="flex flex-col gap-3 pr-6">
         <div className="flex w-full h-72 bg-white rounded-md justify-center">
            <img className="h-72" src={gifUrl} alt={name} loading="lazy" />
         </div>
         <div>
            <p className="mfont25">{name}</p>
            <p className="mfont45 pt-3">Equipment: {equipment}</p>
            <p className="mfont45">Works: {bodyPart}</p>
         </div>
      </div>
   );
};

export default Detail;
