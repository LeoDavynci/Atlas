import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { exerciseOptions, fetchData, youtubeOptions } from "@/utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
   const [exerciseDetail, setExerciseDetail] = useState({});
   const [exerciseVideos, setExerciseVideos] = useState([]);
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

         const exerciseVideoData = await fetchData(
            `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
            youtubeOptions
         );
         setExerciseVideos(exerciseVideoData.contents);

         console.log({ exerciseDetailData });
      };
      fetchExerciseDetail();
   }, [id]);

   const handleBackClick = () => {
      navigate("/explore");
   };

   return (
      <div className="pl-6 pt-6 h-full flex flex-col">
         <button
            onClick={handleBackClick}
            className="px-4 py-2 accentbutton text-white rounded hover:bg-custom-accent2 self-start mb-4"
         >
            {"< Back"}
         </button>

         <div>
            <Detail exerciseDetail={exerciseDetail} />
         </div>

         <div className=" pr-6">
            <ExerciseVideos
               exerciseVideos={exerciseVideos}
               name={exerciseDetail.name}
            />
         </div>

         <div className="pb-10">
            <SimilarExercises />
         </div>
      </div>
   );
};

export default ExerciseDetail;
