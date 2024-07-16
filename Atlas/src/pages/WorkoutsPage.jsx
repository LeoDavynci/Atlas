import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

const WorkoutsPage = () => {
   return (
      <>
         <div className="testgreen p-6 h-screen">
            <div>
               <h1 className="mfont1">WORKOUT</h1>
            </div>
            <div className="flex gap-2 mt-4">
               <Button className="flex gap-2 h-14 flex-1 ">
                  <IoIosAddCircleOutline className="box30" />
                  <p className="mfont4">New Routine</p>
               </Button>
               <Button className="flex gap-2 h-14 flex-1">
                  <IoIosSearch className="box30" />
                  <p className="mfont4">Explore</p>
               </Button>
            </div>
            <div className="mt-8">
               <h1 className="mfont25">ROUTINES</h1>
            </div>
            <div className="mt-4">
               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
               </div>
               <div className="w-full h-40 light rounded-lg mt-4"></div>
            </div>
         </div>
      </>
   );
};

export default WorkoutsPage;
