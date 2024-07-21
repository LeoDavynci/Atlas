import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { exerciseOptions, fetchData, youtubeOptions } from "@/utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
   const [exerciseDetail, setExerciseDetail] = useState({});
   const [exerciseVideos, setExerciseVideos] = useState([]);
   const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchExerciseDetail = async () => {
         const exerciseDbUrl = `https://exercisedb.p.rapidapi.com`;
         const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;

         const exerciseDetailData = await fetchData(
            `${exerciseDbUrl}/exercises/exercise/${id}`,
            exerciseOptions
         );
         setExerciseDetail(exerciseDetailData);

         const exerciseVideosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
            youtubeOptions
         );
         setExerciseVideos(exerciseVideosData.contents);

         const targetMuscleExercisesData = await fetchData(
            `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions
         );
         setTargetMuscleExercises(targetMuscleExercisesData);
      };
      fetchExerciseDetail();
   }, [id]);

   const handleBackClick = () => {
      navigate("/explore");
   };

   return (
      <div className="pb-6 h-full flex flex-col">
         <div className="absolute top-4 left-4 z-10">
            <button
               onClick={handleBackClick}
               className="px-4 py-2 accentbutton text-white rounded hover:bg-custom-accent2 self-start mfont35"
            >
               {"< Back"}
            </button>
         </div>

         <div>
            <Detail exerciseDetail={exerciseDetail} />
         </div>

         <div className="py-10 px-6">
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} />
         </div>

         <div className="pb-5 px-6">
            <ExerciseVideos
               exerciseVideos={exerciseVideos}
               name={exerciseDetail.name}
            />
         </div>
      </div>
   );
};

export default ExerciseDetail;
