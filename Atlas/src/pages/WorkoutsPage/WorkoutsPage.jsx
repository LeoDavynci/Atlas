import { Button } from "@/components/ui/button";
import { UserAuth } from "@/context/AuthContext";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const WorkoutsPage = () => {
   const { user } = UserAuth();

   const navigate = useNavigate();

   const handleNewRoutine = () => {
      navigate("/new-routine");
   };

   return (
      <>
         <div className=" p-6 h-full">
            <div>
               <h1 className="mfont1">WORKOUT</h1>
            </div>
            <div className="flex gap-2 mt-4">
               <Button
                  className="flex gap-2 h-14 flex-1 "
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
               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont49">
                        Benchpress, cable flies, tricep extensions, tricep
                        pushdowns, cable raises, incline dumb..
                     </h1>
                  </div>
                  <div className="mt-2 flex gap-2">
                     <Button className="graybutton w-1/3 mfont3">Edit</Button>
                     <Button className="accentbutton w-2/3 mfont35">
                        Begin Workout
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont49">
                        Benchpress, cable flies, tricep extensions, tricep
                        pushdowns, cable raises, incline dumb..
                     </h1>
                  </div>
                  <div className="mt-2 flex gap-2">
                     <Button className="graybutton w-1/3 mfont3">Edit</Button>
                     <Button className="accentbutton w-2/3 mfont35">
                        Begin Workout
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont49">
                        Benchpress, cable flies, tricep extensions, tricep
                        pushdowns, cable raises, incline dumb..
                     </h1>
                  </div>
                  <div className="mt-2 flex gap-2">
                     <Button className="graybutton w-1/3 mfont3">Edit</Button>
                     <Button className="accentbutton w-2/3 mfont35">
                        Begin Workout
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont49">
                        Benchpress, cable flies, tricep extensions, tricep
                        pushdowns, cable raises, incline dumb..
                     </h1>
                  </div>
                  <div className="mt-2 flex gap-2">
                     <Button className="graybutton w-1/3 mfont3">Edit</Button>
                     <Button className="accentbutton w-2/3 mfont35">
                        Begin Workout
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-40 lightbox mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont49">
                        Benchpress, cable flies, tricep extensions, tricep
                        pushdowns, cable raises, incline dumb..
                     </h1>
                  </div>
                  <div className="mt-2 flex gap-2">
                     <Button className="graybutton w-1/3 mfont3">Edit</Button>
                     <Button className="accentbutton w-2/3 mfont35">
                        Begin Workout
                     </Button>
                  </div>
               </div>

               {/* Buffer */}
               <div className="h-16"></div>
            </div>
         </div>
      </>
   );
};

export default WorkoutsPage;
