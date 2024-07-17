import { Button } from "@/components/ui/button";
import React from "react";

const ProfilePage = () => {
   return (
      <>
         <div className=" p-6 h-full">
            <div>
               <h1 className="mfont1">PROFILE</h1>
            </div>

            <div className="mt-4 flex gap-2 h-32">
               <div className="w-2/3 lightbox"></div>
               <div className="w-1/3 flex-col gap-2">
                  <Button className="lightbutton w-full">Edit</Button>
                  <Button className="lightbutton w-full">Logout</Button>
               </div>
            </div>

            <div className="mt-8">
               <h1 className="mfont25">HISTORY</h1>
            </div>
            <div className="mt-4">
               {/* Each One */}
               <div className="flex-col w-full h-40 light rounded-md mt-4 p-3 pt-4">
                  <div>
                     <h1 className="mfont2">Push</h1>
                  </div>
                  <div className="mt-2 ">
                     <h1 className="mfont45">
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
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
