import React from "react";

const ExerciseVideos = ({ exerciseVideos, name }) => {
   if (!exerciseVideos) return "Loading...";

   if (!Array.isArray(exerciseVideos)) {
      console.error("exerciseVideos is not an array:", exerciseVideos);
      return "Error: Invalid video data";
   }

   return (
      <div className="flex flex-col gap-2 ">
         <p className="mfont25">Video Example</p>
         <div className="bg-white rounded-md p-2">
            {exerciseVideos.slice(0, 1).map((item, index) => (
               <a
                  key={index}
                  href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-2 w-full"
               >
                  <div className="rounded-sm overflow-hidden">
                     <img
                        className="w-full h-auto rounded-sm"
                        src={item.video.thumbnails[0].url}
                        alt={item.video.title}
                     />
                  </div>
                  <div className="">
                     <p className="mfont4 font-semibold">{item.video.title}</p>
                  </div>
               </a>
            ))}
         </div>
      </div>
   );
};

export default ExerciseVideos;
