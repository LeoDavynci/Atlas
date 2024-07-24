import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaFireAlt } from "react-icons/fa";
import React, { useRef, useState, useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import { logout } from "@/functions/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateData } from "@/functions/crud";
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

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { MdLogout, MdEdit } from "react-icons/md";

const ProfilePage = () => {
   const { user } = UserAuth();
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [exercises, setExercises] = useState([]);
   const [inputs, setInputs] = useState({
      split: "",
   });

   const [saves, setSaves] = useState([]);

   useEffect(() => {
      if (user) {
         const savesRef = collection(db, "saves");
         const q = query(savesRef, where("userId", "==", user.uid));

         const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const savesData = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
               expanded: false,
            }));
            setSaves(savesData);
         });

         return () => unsubscribe();
      }
   }, [user]);

   useEffect(() => {
      if (user) {
         setInputs({
            split: user.split || "",
         });
         setIsLoading(false);
      }
   }, [user]);

   const handleEditProfile = async () => {
      try {
         const updatedData = {
            split: inputs.split,
         };

         await updateData("users", user.uid, updatedData);

         setIsDialogOpen(false);
      } catch (error) {
         console.error("Error updating profile:", error);
      }
   };

   const handleLogout = () => {
      logout();
   };

   return (
      <>
         <div className="h-full">
            <div className="flex flex-row accent rounded-b-lg p-6 h-auto w-full justify-between fixed top-0 left-0 bg-custom-accent outershadow">
               <div className="flex flex-col  gap-3 ">
                  <h1 className="mfont25">{user?.fullName}</h1>
                  <div className="mfont35 flex-row flex gap-3">
                     <p className="flex gap-0.5 mt-0.5">
                        <FaFireAlt /> {user?.streak}
                     </p>
                     <p className="mt-0.5">Split: {user?.split}</p>
                     <div className="w-4">
                        <Dialog
                           open={isDialogOpen}
                           onOpenChange={setIsDialogOpen}
                        >
                           <DialogTrigger asChild>
                              <Button className="bg-custom-accent py-2 px-1 h-1/2">
                                 <MdEdit className="fill-custom-light" />
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="w-10/12 light rounded-md">
                              <DialogHeader>
                                 <DialogTitle></DialogTitle>
                                 <DialogDescription></DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                 <div className="flex flex-col gap-1">
                                    <Label htmlFor="bio" className="mfont4">
                                       Split
                                    </Label>
                                    <Input
                                       id="split"
                                       value={inputs.split}
                                       onChange={(e) =>
                                          setInputs({
                                             ...inputs,
                                             split: e.target.value,
                                          })
                                       }
                                       className="rounded-sm"
                                    />
                                 </div>
                              </div>
                              <DialogFooter>
                                 <Button
                                    type="submit"
                                    className="accentbutton"
                                    onClick={handleEditProfile}
                                 >
                                    Save changes
                                 </Button>
                              </DialogFooter>
                           </DialogContent>
                        </Dialog>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-1 w-auto">
                  <Button
                     className="lightbutton w-full h-1/2 flex gap-2"
                     onClick={handleLogout}
                  >
                     <MdLogout />
                     <p>Logout</p>
                  </Button>
               </div>
            </div>

            <div className="mt-36 p-6">
               <h1 className="mfont25">HISTORY</h1>

               <div className="mt-4 ">
                  {saves.map((save) => (
                     <div
                        key={save.id}
                        className="flex flex-col lightbox p-3 mb-4"
                     >
                        {/* Info */}
                        <h1 className="mfont2">{save.name || "Unnamed"} </h1>
                        <div className="mfont4 mt-2 ">{save.date}</div>
                        {/* Stats */}
                        <div className="flex flex-row justify-between mfont4 py-2 pb-4 w-9/12">
                           <div className="flex flex-col gap-1">
                              <p>Duration</p>
                              <p>{save.time}</p>
                           </div>
                           <div className="flex flex-col gap-1">
                              <p>{save.sets === 1 ? "Set" : "Sets"}</p>
                              <p>{save.sets}</p>
                           </div>
                           <div className="flex flex-col gap-1">
                              <p>Volume</p>
                              <p>{save.volume}</p>
                           </div>
                        </div>

                        {/* Movements */}
                        {save.exercises.slice(0, 2).map((exercise, index) => (
                           <div
                              key={index}
                              className="flex flex-row gap-2 mb-1  h-16 items-center mfont4"
                           >
                              <div className=" w-16">
                                 <img
                                    className="w-12 h-12 rounded-full"
                                    src={exercise.gifUrl || "/AtlasB.png"}
                                    loading="lazy"
                                    onError={(e) => {
                                       e.target.onerror = null;
                                       e.target.src = "/AtlasB.png";
                                    }}
                                 />
                              </div>
                              <div className="flex flex-col w-auto gap-1">
                                 <p>{exercise.name}</p>
                                 <div className="flex flex-row gap-2">
                                    <p>
                                       {exercise.completeSets}{" "}
                                       {exercise.completeSets === 1
                                          ? "set"
                                          : "sets"}{" "}
                                       | {exercise.totalReps}{" "}
                                       {exercise.totalReps === 1
                                          ? "rep"
                                          : "reps"}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        ))}

                        {/* Expanded exercises */}
                        {save.expanded &&
                           save.exercises.slice(2).map((exercise, index) => (
                              <div
                                 key={index}
                                 className="flex flex-row gap-2 mb-1 h-16 items-center mfont4"
                              >
                                 <div className=" w-16">
                                    <img
                                       className="w-12 h-12 rounded-full"
                                       src={exercise.gifUrl || "/AtlasB.png"}
                                       loading="lazy"
                                       onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "/AtlasB.png";
                                       }}
                                    />
                                 </div>

                                 <div className="flex flex-col w-auto">
                                    <p>{exercise.name}</p>
                                    <div className="flex flex-row gap-2">
                                       <p>
                                          {exercise.completeSets}{" "}
                                          {exercise.completeSets === 1
                                             ? "set"
                                             : "sets"}{" "}
                                          | {exercise.totalReps}{" "}
                                          {exercise.totalReps === 1
                                             ? "rep"
                                             : "reps"}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}

                        {!save.expanded ? (
                           <div className="flex justify-center">
                              {save.exercises.length > 2 && (
                                 <p className="mfont49 mt-2">
                                    {save.exercises.length - 2} more{" "}
                                    {save.exercises.length - 2 === 1
                                       ? "exercise"
                                       : "exercises"}
                                 </p>
                              )}
                           </div>
                        ) : (
                           <></>
                        )}

                        {/* Show more */}
                        <div className="flex w-full pt-3 self-center">
                           <Button
                              className="accentbutton w-full mfont35"
                              onClick={() => {
                                 // Toggle the expanded state for this save
                                 setSaves((prevSaves) =>
                                    prevSaves.map((s) =>
                                       s.id === save.id
                                          ? { ...s, expanded: !s.expanded }
                                          : s
                                    )
                                 );
                              }}
                           >
                              {save.expanded ? "Show Less" : "Show More"}
                           </Button>
                        </div>
                     </div>
                  ))}

                  {/* Buffer */}
                  <div className="h-14"></div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
