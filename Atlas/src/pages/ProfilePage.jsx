import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaFireAlt } from "react-icons/fa";
import React, { useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { logout } from "@/functions/auth";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateData } from "@/functions/crud";

const ProfilePage = () => {
   const { user } = UserAuth();
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleProfileUpdate = () => {
      const newUsername = document.getElementById("username").value;
      const newSplit = document.getElementById("split").value;

      updateData(user.uid, {
         username: newUsername,
         split: newSplit,
      });

      setIsDialogOpen(false);
   };

   const handleLogout = () => {
      logout();
   };

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
                           <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                     </div>
                     <div className="flex-col flex gap-0.5">
                        <h1 className="mfont29">{user?.fullName}</h1>
                        <div className="mfont3 flex-row flex gap-2">
                           <p className="flex gap-0.5">
                              <FaFireAlt /> {user?.streak}
                           </p>
                           <p>Split: {user?.split}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="w-1/3 flex-col flex gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                     <DialogTrigger asChild>
                        <Button className="lightbutton w-full h-1/2">
                           Edit Profile
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="w-10/12 light rounded-md">
                        <DialogHeader>
                           <DialogTitle className="mfont29">
                              Edit profile
                           </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="flex flex-col gap-1">
                              <Label htmlFor="username" className="mfont4">
                                 Username
                              </Label>
                              <Input
                                 id="username"
                                 defaultValue={user?.username}
                                 className="rounded-sm"
                              />
                           </div>

                           <div className="flex flex-col gap-1">
                              <Label htmlFor="bio" className="mfont4">
                                 Split
                              </Label>
                              <Input
                                 id="split"
                                 defaultValue={user?.split}
                                 className="rounded-sm"
                              />
                           </div>
                        </div>
                        <DialogFooter>
                           <Button
                              type="submit"
                              className="accentbutton"
                              onClick={handleProfileUpdate}
                           >
                              Save changes
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
                  <Button
                     className="lightbutton w-full h-1/2"
                     onClick={handleLogout}
                  >
                     Logout
                  </Button>
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
                  <div className="mfont49 mt-1 ">21 hours ago</div>
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
