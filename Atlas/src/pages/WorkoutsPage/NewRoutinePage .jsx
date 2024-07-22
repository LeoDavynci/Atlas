import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineSaveAlt } from "react-icons/md";

const NewRoutinePage = () => {
   const [routineName, setRoutineName] = useState("");
   const [exercises, setExercises] = useState([]);
   const navigate = useNavigate();

   const handleAddExercise = () => {
      setExercises([...exercises, { name: "", sets: [], reps: [] }]);
   };

   const handleSaveRoutine = () => {
      // Here you would save the routine to your database
      // After saving, redirect back to the workouts page
      navigate("/workouts");
   };

   return (
      <>
         <div className="z-10 flex flex-col fixed top-0 left-0 right-0 h-52 w-full bg-custom-accent rounded-b-lg p-6 outershadow">
            <h1 className="mfont1">New Routine</h1>
            <Input
               type="text"
               value={routineName}
               onChange={(e) => setRoutineName(e.target.value)}
               placeholder="Routine Name"
               className="mt-4 w-full p-2 rounded-sm "
            />

            <div className="flex flex-row justify-between mt-4 gap-4 ">
               <Button
                  onClick={handleAddExercise}
                  className="w-1/2 lightbutton flex gap-2 h-full"
               >
                  <IoIosAddCircleOutline className="box30" />
                  <p>Add Exercise</p>
               </Button>
               <Button
                  onClick={handleSaveRoutine}
                  className="w-1/2 lightbutton flex gap-2 h-full"
               >
                  <MdOutlineSaveAlt className="box30" />
                  <p>Save Routine</p>
               </Button>
            </div>
         </div>
         <div className="p-6">
            {exercises.map((exercise, index) => (
               <div key={index} className="mt-4">
                  <Input
                     type="text"
                     value={exercise.name}
                     onChange={(e) => {
                        const newExercises = [...exercises];
                        newExercises[index].name = e.target.value;
                        setExercises(newExercises);
                     }}
                     placeholder="Exercise Name"
                     className="w-full p-2 border rounded"
                  />
                  {/* Add inputs for sets and reps here */}
               </div>
            ))}
         </div>
      </>
   );
};

export default NewRoutinePage;
