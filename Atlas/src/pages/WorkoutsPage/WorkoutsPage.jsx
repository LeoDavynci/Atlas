import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { deleteData, readAllData } from "@/functions/crud";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const WorkoutsPage = () => {
   const { user } = UserAuth();
   const navigate = useNavigate();
   const [routines, setRoutines] = useState([]);

   // useEffect(() => {
   //    const fetchRoutines = async () => {
   //       const routinesData = await readAllData("routines");
   //       setRoutines(routinesData);
   //    };
   //    fetchRoutines();
   // }, []);

   useEffect(() => {
      if (user) {
         const routinesRef = collection(db, "routines");
         const q = query(routinesRef, where("userId", "==", user.uid));

         const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const routinesData = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));
            setRoutines(routinesData);
         });

         return () => unsubscribe();
      }
   }, [user]);

   const handleNewRoutine = () => {
      navigate("/new-routine");
   };

   const handleDeleteRoutine = async (id) => {
      await deleteData("routines", id);
      setRoutines(routines.filter((routine) => routine.id !== id));
   };

   const handleEditRoutine = (id) => {
      // Navigate to edit page or open edit modal
      navigate(`/edit-routine/${id}`);
   };

   const handleBeginWorkout = (routine) => {
      // Navigate to workout page or start workout
      navigate(`/start-workout/${routine.id}`);
   };

   return (
      <div className="p-6 h-full">
         <h1 className="mfont1">WORKOUT</h1>
         <div className="flex gap-2 mt-4">
            <Button
               className="flex gap-2 h-14 flex-1"
               onClick={handleNewRoutine}
            >
               <IoIosAddCircleOutline className="box30" />
               <p className="mfont4">New Routine</p>
            </Button>
         </div>
         <div className="mt-8">
            <h1 className="mfont25">ROUTINES</h1>
         </div>

         <div className="mt-4">
            {routines.map((routine) => (
               <div
                  key={routine.id}
                  className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4"
               >
                  <h1 className="mfont2">{routine.name}</h1>
                  <p className="mfont49 mt-2">
                     {routine.exercises.map((ex) => ex.name).join(", ")}
                  </p>
                  <div className="mt-2 flex gap-2">
                     <Button
                        className="graybutton w-1/3 mfont3"
                        onClick={() => handleEditRoutine(routine.id)}
                     >
                        Edit
                     </Button>
                     <Button
                        className="accentbutton w-2/3 mfont35"
                        onClick={() => handleBeginWorkout(routine)}
                     >
                        Begin Workout
                     </Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default WorkoutsPage;
