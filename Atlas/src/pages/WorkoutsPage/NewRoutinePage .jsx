import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerDescription,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { exerciseOptions, fetchData } from "@/utils/fetchData";
import { createData } from "@/functions/crud";
import ExerciseCard from "@/components/ExerciseCard";
import { FaRegTrashAlt } from "react-icons/fa";
import { UserAuth } from "@/context/AuthContext";

const NewRoutinePage = () => {
   const [routineName, setRoutineName] = useState("");
   const [exercises, setExercises] = useState([]);
   const [availableExercises, setAvailableExercises] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredExercises, setFilteredExercises] = useState([]);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [exercisesPerPage] = useState(24);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const { user } = UserAuth();

   useEffect(() => {
      const fetchExercisesData = async () => {
         setLoading(true);
         const exerciseData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0",
            exerciseOptions
         );
         setAvailableExercises(exerciseData);
         setFilteredExercises(exerciseData);
         setLoading(false);
      };
      fetchExercisesData();
   }, []);

   useEffect(() => {
      if (availableExercises.length > 0) {
         const filtered = availableExercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setFilteredExercises(filtered);
         setCurrentPage(1);
      }
   }, [searchTerm, availableExercises]);

   // Get current exercises
   const indexOfLastExercise = currentPage * exercisesPerPage;
   const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
   const currentExercises = filteredExercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
   );

   // Calculate total pages
   const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

   // Change page
   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const handleAddExercise = (exercise) => {
      setExercises([
         ...exercises,
         { ...exercise, sets: [{ weight: 0, reps: 0 }] },
      ]);
      setIsDrawerOpen(false);
   };

   const handleExerciseChange = (exerciseIndex, setIndex, field, value) => {
      const newExercises = [...exercises];
      newExercises[exerciseIndex].sets[setIndex][field] = value;
      setExercises(newExercises);
   };

   const handleAddSet = (exerciseIndex) => {
      const newExercises = [...exercises];
      newExercises[exerciseIndex].sets.push({ weight: "", reps: "" });
      setExercises(newExercises);
   };

   const handleRemoveSet = (exerciseIndex, setIndex) => {
      const newExercises = [...exercises];
      newExercises[exerciseIndex].sets.splice(setIndex, 1);
      setExercises(newExercises);
   };

   const handleDeleteExercise = (exerciseIndex) => {
      const newExercises = exercises.filter(
         (_, index) => index !== exerciseIndex
      );
      setExercises(newExercises);
   };

   const handleSaveRoutine = async () => {
      if (!user) {
         console.error("No user logged in");
         return;
      }

      const routineData = {
         name: routineName,
         exercises: exercises,
         createdAt: new Date().toISOString(),
         userId: user.uid,
      };

      try {
         await createData("routines", routineData);
         console.log("Workout saved successfully");
         navigate("/workouts");
      } catch (error) {
         console.error("Error saving workout:", error);
      }
   };

   const cancleCreateRoutine = () => {
      navigate("/workouts");
   };

   return (
      <div className="">
         <div className="accent rounded-b-lg p-6 fixed top-0 left-0 right-0 z-10 outershadow">
            <h1 className="mfont1">Create New Routine</h1>
            <Input
               value={routineName}
               onChange={(e) => setRoutineName(e.target.value)}
               placeholder="Routine Name"
               className="mt-4 rounded-sm border-custom-accent2"
            />

            <div className="flex flex-row mt-6 gap-3">
               <Button className="w-1/2" onClick={cancleCreateRoutine}>
                  Cancel
               </Button>

               <Button onClick={handleSaveRoutine} className=" w-1/2">
                  Save Routine
               </Button>
            </div>
         </div>

         <div className="p-6 pt-56">
            {exercises.map((exercise, exerciseIndex) => (
               <div
                  key={exerciseIndex}
                  className="flex flex-col lightbox p-3 mb-4 "
               >
                  <div className="flex flex-row gap-2 items-center mb-4">
                     <img
                        className="w-16 h-16 rounded-full"
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        loading="lazy"
                     />
                     <div className="flex flex-col gap-1">
                        <p className="mfont2">{exercise.name}</p>
                        <div className="mfont5">
                           <Button className="accent rounded-sm py-1 px-2 h-auto w-auto">
                              <p className="mfont55 whitespace-normal break-words">
                                 {exercise.bodyPart}
                                 {" > "}
                                 {exercise.target}
                              </p>
                           </Button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-2">
                     <div className="text-center mfont4b">Set</div>
                     <div className="text-left mfont4b">Weight</div>
                     <div className="text-left mfont4b">Reps</div>
                     <div></div>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                     <div
                        key={setIndex}
                        className="grid grid-cols-4 gap-2 mb-2 items-center"
                     >
                        <div className="text-center mfont4b">
                           {setIndex + 1}
                        </div>
                        <Input
                           type="number"
                           value={set.weight}
                           onChange={(e) =>
                              handleExerciseChange(
                                 exerciseIndex,
                                 setIndex,
                                 "weight",
                                 parseInt(e.target.value)
                              )
                           }
                           placeholder="Weight"
                           className="rounded-sm pl-2 w-3/4 border-neutral-300"
                        />
                        <Input
                           type="number"
                           value={set.reps}
                           onChange={(e) =>
                              handleExerciseChange(
                                 exerciseIndex,
                                 setIndex,
                                 "reps",
                                 parseInt(e.target.value)
                              )
                           }
                           placeholder="Reps"
                           className="rounded-sm pl-2 w-3/4 border-neutral-300"
                        />
                        <div className="ml-6 h-full">
                           <Button
                              onClick={() =>
                                 handleRemoveSet(exerciseIndex, setIndex)
                              }
                              className="p-1 h-full w-10 transition-colors duration-200 ease-in-out hover:bg-custom-accent "
                              variant="destructive"
                           >
                              <FaRegTrashAlt className="w-5 h-5" />
                           </Button>
                        </div>
                     </div>
                  ))}
                  <div className="flex flex-row gap-2 mt-2">
                     <Button
                        onClick={() => handleAddSet(exerciseIndex)}
                        className=" w-full accentbutton"
                     >
                        Add Set
                     </Button>
                     <Button
                        onClick={() => handleDeleteExercise(exerciseIndex)}
                        className="graybutton"
                     >
                        Delete Exercise
                     </Button>
                  </div>
               </div>
            ))}

            <Drawer
               open={isDrawerOpen}
               onOpenChange={setIsDrawerOpen}
               className="accent"
            >
               <DrawerTrigger asChild>
                  <Button className="accentbutton w-full h-12 mt-2">
                     Add Exercise
                  </Button>
               </DrawerTrigger>
               <DrawerContent className="h-[80vh] p-6 accent border-none rounded-t-lg">
                  <DrawerHeader className="mfont45 p-0 pb-6">
                     <DrawerTitle></DrawerTitle>
                     <DrawerDescription></DrawerDescription>
                     <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search exercises..."
                        className="rounded-sm"
                     />
                  </DrawerHeader>
                  {loading ? (
                     <div>Loading...</div>
                  ) : (
                     <div className="overflow-y-auto">
                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
                           {currentExercises.map((exercise, index) => (
                              <ExerciseCard
                                 key={`${exercise.id}-${index}`}
                                 exercise={exercise}
                                 onClick={() => handleAddExercise(exercise)}
                                 noClick={true}
                              />
                           ))}
                        </div>
                        <div className="flex justify-center mt-4 gap-4 items-center">
                           <Button
                              onClick={() => paginate(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="light rounded-sm"
                           >
                              ←
                           </Button>
                           <span className="mfont35">
                              Page {currentPage} of {totalPages}
                           </span>
                           <Button
                              onClick={() => paginate(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="light rounded-sm"
                           >
                              →
                           </Button>
                        </div>
                     </div>
                  )}
               </DrawerContent>
            </Drawer>
         </div>
      </div>
   );
};

export default NewRoutinePage;
