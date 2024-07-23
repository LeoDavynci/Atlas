import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { createData, readData, updateData } from "@/functions/crud";
import { UserAuth } from "@/context/AuthContext";
import { fetchData, exerciseOptions } from "@/utils/fetchData";
import ExerciseCard from "@/components/ExerciseCard";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineExitToApp } from "react-icons/md";

const formatTime = (seconds) => {
   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds % 3600) / 60);
   const remainingSeconds = seconds % 60;

   const parts = [];
   if (hours > 0) parts.push(`${hours}h`);
   if (minutes > 0) parts.push(`${minutes}m`);
   if (remainingSeconds > 0 || parts.length === 0)
      parts.push(`${remainingSeconds}s`);

   return parts.join(" ");
};

const formatDate = (date) => {
   const options = { year: "numeric", month: "long", day: "numeric" };
   return date.toLocaleDateString("en-US", options);
};

const SessionPage = () => {
   const { routineId } = useParams();
   const [routine, setRoutine] = useState(null);
   const [error, setError] = useState(null);
   const [exercises, setExercises] = useState([]);
   const [availableExercises, setAvailableExercises] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredExercises, setFilteredExercises] = useState([]);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const navigate = useNavigate();
   const { user } = UserAuth();

   const [duration, setDuration] = useState(0);
   const [totalSets, setTotalSets] = useState(0);
   const [totalVolume, setTotalVolume] = useState(0);
   const [isTimerDialogOpen, setIsTimerDialogOpen] = useState(false);
   const [restTime, setRestTime] = useState(0);
   const [isTimerRunning, setIsTimerRunning] = useState(false);
   const timerIntervalRef = useRef(null);
   const durationIntervalRef = useRef(null);
   const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState(null);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      durationIntervalRef.current = setInterval(() => {
         setDuration((prevDuration) => prevDuration + 1);
      }, 1000);

      return () => clearInterval(durationIntervalRef.current);
   }, []);

   useEffect(() => {
      const newTotalSets = exercises.reduce(
         (total, exercise) => total + exercise.sets.length,
         0
      );
      setTotalSets(newTotalSets);

      const newTotalVolume = exercises.reduce((total, exercise) => {
         return (
            total +
            exercise.sets.reduce(
               (exerciseTotal, set) => exerciseTotal + set.weight * set.reps,
               0
            )
         );
      }, 0);
      setTotalVolume(newTotalVolume);
   }, [exercises]);

   useEffect(() => {
      const fetchRoutine = async () => {
         try {
            const fetchedRoutine = await readData("routines", routineId);
            if (fetchedRoutine) {
               setRoutine(fetchedRoutine);
               setExercises(fetchedRoutine.exercises || []);
            } else {
               setError("Routine not found");
            }
         } catch (err) {
            console.error("Error fetching routine:", err);
            setError("Error fetching routine data");
         }
      };

      fetchRoutine();
   }, [routineId]);

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

   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
         .toString()
         .padStart(2, "0")}`;
   };

   const handleStartTimer = () => {
      setIsTimerRunning(true);
      timerIntervalRef.current = setInterval(() => {
         setRestTime((prevTime) => {
            if (prevTime <= 0) {
               clearInterval(timerIntervalRef.current);
               setIsTimerRunning(false);
               return 0;
            }
            return prevTime - 1;
         });
      }, 1000);
   };

   const handleStopTimer = () => {
      clearInterval(timerIntervalRef.current);
      setIsTimerRunning(false);
   };

   const handleResetTimer = () => {
      clearInterval(timerIntervalRef.current);
      setIsTimerRunning(false);
      setRestTime(0);
   };

   const handleIncrementTimer = () => {
      setRestTime((prevTime) => prevTime + 15);
   };

   const handleDecrementTimer = () => {
      setRestTime((prevTime) => Math.max(0, prevTime - 15));
   };

   const handleAddExercise = (exercise) => {
      setExercises([
         ...exercises,
         { ...exercise, sets: [{ weight: 0, reps: 0, completed: false }] },
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
      newExercises[exerciseIndex].sets.push({ weight: 0, reps: 0 });
      setExercises(newExercises);
   };

   const handleRemoveSet = (exerciseIndex, setIndex) => {
      if (deleteConfirmationIndex === `${exerciseIndex}-${setIndex}`) {
         const newExercises = [...exercises];
         newExercises[exerciseIndex].sets.splice(setIndex, 1);
         setExercises(newExercises);
         setDeleteConfirmationIndex(null);
      } else {
         setDeleteConfirmationIndex(`${exerciseIndex}-${setIndex}`);
         // Set a timeout to reset the confirmation state after 3 seconds
         setTimeout(() => setDeleteConfirmationIndex(null), 3000);
      }
   };

   const handleDeleteExercise = (exerciseIndex) => {
      setExercises((prevExercises) =>
         prevExercises.filter((_, index) => index !== exerciseIndex)
      );
   };

   const handleToggleSetCompletion = (exerciseIndex, setIndex) => {
      const newExercises = [...exercises];
      newExercises[exerciseIndex].sets[setIndex].completed =
         !newExercises[exerciseIndex].sets[setIndex].completed;
      setExercises(newExercises);
   };

   const handleDiscard = () => {
      navigate("/workouts");
   };

   const handleFinishWorkout = async () => {
      try {
         const updatedRoutine = { ...routine, exercises: exercises };
         await updateData("routines", routineId, updatedRoutine);
         console.log("Workout finished and saved successfully");

         const loggedExercises = exercises.map((exercise) => {
            const completeSets = exercise.sets.filter(
               (set) => set.weight > 0 && set.reps > 0
            ).length;
            const totalReps = exercise.sets.reduce(
               (total, set) => total + (set.reps > 0 ? set.reps : 0),
               0
            );

            return {
               name: exercise.name,
               // bodyPart: exercise.bodyPart,
               // target: exercise.target,
               // sets: exercise.sets.map((set) => {
               //    return {
               //       weight: set.weight,
               //       reps: set.reps,
               //    };
               // }),
               gifUrl: exercise.gifUrl,
               completeSets: completeSets,
               totalReps: totalReps,
            };
         });

         // Get current date and time
         const now = new Date();
         const dateString = formatDate(now);

         const finishedData = {
            name: routine.name,
            exercises: loggedExercises,
            userId: user.uid,
            date: dateString,
            time: formatTime(duration),
            sets: totalSets,
            volume: totalVolume,
         };

         try {
            await createData("saves", finishedData);
            console.log("Workout logged successfully");
         } catch (error) {
            console.error("Error saving workout:", error);
         }

         navigate("/workouts");
      } catch (error) {
         console.error("Error saving workout:", error);
      }
   };

   if (error) {
      return <div className="p-6">Error: {error}</div>;
   }

   if (!routine) {
      return <div className="p-6">Loading...</div>;
   }

   return (
      <>
         {/* Top Bar */}
         <div className="z-10 flex flex-col fixed top-0 left-0 right-0 h-auto w-full bg-custom-accent rounded-b-lg p-6 outershadow">
            <h1 className="mfont1">{routine.name}</h1>
            <div className="flex flex-row justify-between pt-2 gap-3">
               <div>
                  <p>Duration: {formatTime(duration)}</p>
               </div>
               <div>
                  <p>Sets: {totalSets}</p>
               </div>
               <div>
                  <p>Volume: {totalVolume}</p>
               </div>
            </div>
            <div className="flex flex-row justify-between h-16 pt-2 mfont4 gap-3">
               <div className="h-full w-1/3 ">
                  <Button
                     className="lightbutton h-full w-full p-1"
                     onClick={handleDiscard}
                  >
                     <div className="flex flex-row justify-center items-center p-1 gap-1 ">
                        <MdOutlineExitToApp className="h-6 w-6" />
                        <p>Exit</p>
                     </div>
                  </Button>
               </div>

               <div className="h-full w-1/3 ">
                  <Dialog
                     open={isTimerDialogOpen}
                     onOpenChange={setIsTimerDialogOpen}
                  >
                     <DialogTrigger asChild>
                        <Button className="lightbutton h-full w-full">
                           <div className="flex flex-row justify-center items-center p-2 gap-1 ">
                              <IoTimeOutline className="h-6 w-6" />
                              <p>Timer</p>
                           </div>
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="lightbox h-auto w-[60%]">
                        <DialogHeader>
                           <DialogTitle className="mfont4">
                              Rest Timer
                           </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4">
                           <div className="mfont15">{formatTime(restTime)}</div>
                           <div className="flex gap-4">
                              <Button
                                 onClick={handleDecrementTimer}
                                 disabled={isTimerRunning}
                                 className="mfont3"
                              >
                                 <FiMinus />
                              </Button>
                              <Button
                                 onClick={handleIncrementTimer}
                                 disabled={isTimerRunning}
                                 className="mfont3"
                              >
                                 <FiPlus />
                              </Button>
                           </div>
                           <div className="flex gap-4">
                              {isTimerRunning ? (
                                 <Button
                                    className="accentbutton2 mfont45"
                                    onClick={handleStopTimer}
                                 >
                                    Stop
                                 </Button>
                              ) : (
                                 <Button
                                    className="accentbutton mfont45"
                                    onClick={handleStartTimer}
                                 >
                                    Start
                                 </Button>
                              )}
                              <Button
                                 className="graybutton mfont4"
                                 onClick={handleResetTimer}
                              >
                                 Reset
                              </Button>
                           </div>
                        </div>
                     </DialogContent>
                  </Dialog>
               </div>

               <div className="h-full w-1/3 ">
                  <Button
                     onClick={handleFinishWorkout}
                     className="lightbutton h-full w-full"
                  >
                     <div className="flex flex-row justify-center items-center p-2 gap-1 ">
                        <IoMdCheckmarkCircleOutline className="h-6 w-6" />
                        <p>Finish</p>
                     </div>
                  </Button>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-6 pt-52">
            {exercises.map((exercise, exerciseIndex) => (
               <div
                  key={exerciseIndex}
                  className="flex flex-col lightbox p-3 mb-4"
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

                  <div className="grid grid-cols-5 gap-2 mb-2">
                     <div className="text-center mfont4b">Set</div>
                     <div className="text-left mfont4b">Weight</div>
                     <div className="text-left mfont4b">Reps</div>
                     <div></div>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                     <div
                        key={setIndex}
                        className={`grid grid-cols-5 gap-2 py-1 mb-1 items-center rounded-sm ${
                           set.completed ? "bg-custom-accent" : ""
                        }`}
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
                           className="rounded-sm pl-2 w-full border-custom-accent"
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
                           className="rounded-sm pl-2 w-full border-custom-accent"
                        />
                        <div className="col-span-2 flex justify-end pr-6 gap-2">
                           <Button
                              onClick={() =>
                                 handleRemoveSet(exerciseIndex, setIndex)
                              }
                              className={`p-1 h-30 w-auto transition-colors duration-200 ease-in-out ${
                                 deleteConfirmationIndex ===
                                 `${exerciseIndex}-${setIndex}`
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "hover:bg-custom-accent"
                              }`}
                              variant="destructive"
                           >
                              {deleteConfirmationIndex ===
                              `${exerciseIndex}-${setIndex}` ? (
                                 <span className="text-xs whitespace-nowrap">
                                    Confirm
                                 </span>
                              ) : (
                                 <FaRegTrashAlt className="w-5 h-5" />
                              )}
                           </Button>
                           <Button
                              onClick={() =>
                                 handleToggleSetCompletion(
                                    exerciseIndex,
                                    setIndex
                                 )
                              }
                              className={`p-1 h-full w-10 transition-colors duration-200 ease-in-out ${
                                 set.completed
                                    ? "bg-custom-accent hover:bg-custom-accent"
                                    : "bg-custom-light hover:bg-custom-accent"
                              }`}
                           >
                              <IoMdCheckmarkCircleOutline className="w-5 h-5" />
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
         </div>
      </>
   );
};

export default SessionPage;
