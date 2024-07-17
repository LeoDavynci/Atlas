import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaFireAlt } from "react-icons/fa";

import React from "react";

const ProfilePage = () => {
   return (
      <>
         <div className=" p-6 h-full">
            <div>
               <h1 className="mfont1">PROFILE</h1>
            </div>

            <div className="mt-4 flex gap-2 h-32">
               <div className="w-2/3 lightbox flex-col flex p-3 gap-2">
                  <div className="h-1/2 flex flex-row gap-3">
                     <div>
                        <Avatar className="h-12 w-12">
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>VL</AvatarFallback>
                        </Avatar>
                     </div>
                     <div className="flex-col flex gap-1">
                        <h1 className="mfont2">Vince</h1>
                        <div className="mfont3 flex-row flex gap-2">
                           <p className="flex gap-0.5">
                              <FaFireAlt />4
                           </p>
                           <p>Split: PPL</p>
                        </div>
                     </div>
                  </div>
                  <div className="h-1/2">
                     <p className="mfont3">Bio: fjdkafjkdsa</p>
                  </div>
               </div>
               <div className="w-1/3 flex-col flex gap-2">
                  <Button className="lightbutton w-full h-1/2">Edit</Button>
                  <Button className="lightbutton w-full h-1/2">Logout</Button>
               </div>
            </div>

            <div className="mt-8">
               <h1 className="mfont25">HISTORY</h1>
            </div>
            <div className="mt-4">
               {/* Each One */}
               <div className="flex-col w-full h-68 light rounded-md mt-4 p-3 pt-4">
                  <div className="mfont2">PUSH</div>
                  <div className="mfont45 mt-1 ">21 hours ago</div>
                  {/* stats */}
                  <div className="flex flex-row justify-between mfont4 pt-2 w-9/12">
                     <div className="flex flex-col gap-1">
                        <p>Time</p>
                        <p>99:99:99</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Sets</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Reps</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Volume</p>
                        <p>999999</p>
                     </div>
                  </div>
                  {/* movement 1 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>
                  {/* movement 2 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>

                  {/* show more */}
                  <div className="flex pt-3 self-center">
                     <Button className="accentbutton w-full mfont35">
                        {" "}
                        See More
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-68 light rounded-md mt-4 p-3 pt-4">
                  <div className="mfont2">PUSH</div>
                  <div className="mfont45 mt-1 ">21 hours ago</div>
                  {/* stats */}
                  <div className="flex flex-row justify-between mfont4 pt-2 w-9/12">
                     <div className="flex flex-col gap-1">
                        <p>Time</p>
                        <p>99:99:99</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Sets</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Reps</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Volume</p>
                        <p>999999</p>
                     </div>
                  </div>
                  {/* movement 1 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>
                  {/* movement 2 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>

                  {/* show more */}
                  <div className="flex pt-3 self-center">
                     <Button className="accentbutton w-full mfont35">
                        {" "}
                        See More
                     </Button>
                  </div>
               </div>

               {/* Each One */}
               <div className="flex-col w-full h-68 light rounded-md mt-4 p-3 pt-4">
                  <div className="mfont2">PUSH</div>
                  <div className="mfont45 mt-1 ">21 hours ago</div>
                  {/* stats */}
                  <div className="flex flex-row justify-between mfont4 pt-2 w-9/12">
                     <div className="flex flex-col gap-1">
                        <p>Time</p>
                        <p>99:99:99</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Sets</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Reps</p>
                        <p>9999</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p>Volume</p>
                        <p>999999</p>
                     </div>
                  </div>
                  {/* movement 1 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>
                  {/* movement 2 */}
                  <div className="flex flex-row pt-2 mfont4 gap-2">
                     <div className="h-11 w-11 bg-custom-accent rounded-full"></div>
                     <div className="flex flex-col gap-1">
                        <p>Benchpress</p>
                        <p>4 sets</p>
                     </div>
                  </div>

                  {/* show more */}
                  <div className="flex pt-3 self-center">
                     <Button className="accentbutton w-full mfont35">
                        {" "}
                        See More
                     </Button>
                  </div>
               </div>

               {/* Buffer */}
               <div className="h-14"></div>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
