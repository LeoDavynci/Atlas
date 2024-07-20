import React from "react";

const Detail = ({ exerciseDetail }) => {
   const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;
   return (
      <div className="flex flex-col gap-4 pb-4 bg-white rounded-b-lg">
         <div className="flex w-full h-72 bg-white rounded-b-lg justify-center">
            <img className="h-72" src={gifUrl} alt={name} loading="lazy" />
         </div>
         <div className="px-6">
            <p className="mfont27">{name}</p>
            <p className="mfont47 pt-3">Equipment: {equipment}</p>
            <p className="mfont47">Works: {bodyPart}</p>
         </div>
      </div>
   );
};

export default Detail;
