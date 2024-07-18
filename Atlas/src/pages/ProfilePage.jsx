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
import usePreviewImg from "@/hooks/usePreviewImg";
import Resizer from "react-image-file-resizer";
import Compressor from "compressorjs";

const ProfilePage = () => {
   const { user } = UserAuth();
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [inputs, setInputs] = useState({
      username: "",
      split: "",
   });

   const fileRef = useRef(null);
   const { selectedFile, setSelectedFile } = usePreviewImg();

   const uploadImage = async (file) => {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      try {
         const snapshot = await uploadBytes(storageRef, file);
         const downloadURL = await getDownloadURL(snapshot.ref);
         return downloadURL;
      } catch (error) {
         console.error("Error uploading image: ", error);
         throw error;
      }
   };

   useEffect(() => {
      if (user) {
         setInputs({
            username: user.username || "",
            split: user.split || "",
         });
         setIsLoading(false);
      }
   }, [user]);

   const handleImageChangeWithResize = (event) => {
      const file = event.target.files[0];
      if (file) {
         Resizer.imageFileResizer(
            file,
            800,
            800,
            "JPEG",
            80,
            0,
            (uri) => {
               const blob = dataURLtoBlob(uri);
               new Compressor(blob, {
                  quality: 0.8,
                  success: (compressedResult) => {
                     const compressedFile = new File(
                        [compressedResult],
                        file.name,
                        { type: compressedResult.type }
                     );
                     const fileReader = new FileReader();
                     fileReader.onload = () => {
                        setSelectedFile(fileReader.result);
                     };
                     fileReader.readAsDataURL(compressedFile);
                  },
               });
            },
            "base64"
         );
      }
   };

   const dataURLtoBlob = (dataurl) => {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
   };

   const handleEditProfile = async () => {
      try {
         const updatedData = {
            username: inputs.username,
            split: inputs.split,
         };

         if (selectedFile) {
            const imageUrl = await uploadImage(selectedFile);
            updatedData.profilePicURL = imageUrl;
         }

         await updateData("users", user.uid, updatedData);

         setIsDialogOpen(false);
         // alert("Profile updated successfully!");
      } catch (error) {
         console.error("Error updating profile:", error);
         // alert("Failed to update profile. Please try again.");
      }
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
                           <AvatarImage
                              src={
                                 user?.profilePicURL ||
                                 "https://github.com/shadcn.png"
                              }
                           />
                           <AvatarFallback>
                              {user?.username?.charAt(0) || "U"}
                           </AvatarFallback>
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
                           <DialogDescription className="mfont4"></DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="flex flex-col gap-1 items-center">
                              <Avatar className="h-24 w-24">
                                 <AvatarImage
                                    src={
                                       selectedFile ||
                                       user?.profilePicURL ||
                                       "https://github.com/shadcn.png"
                                    }
                                 />
                                 <AvatarFallback>
                                    {user?.username?.charAt(0) || "U"}
                                 </AvatarFallback>
                              </Avatar>
                              <Button
                                 className="accentbutton w-1/2"
                                 onClick={() => fileRef.current.click()}
                              >
                                 Change Picture
                              </Button>
                              <div className="hidden">
                                 <Input
                                    type="file"
                                    ref={fileRef}
                                    onChange={handleImageChangeWithResize}
                                    accept="image/*"
                                 />
                              </div>
                           </div>
                           <div className="flex flex-col gap-1">
                              <Label htmlFor="username" className="mfont4">
                                 Username
                              </Label>
                              <Input
                                 id="username"
                                 value={inputs.username}
                                 onChange={(e) =>
                                    setInputs({
                                       ...inputs,
                                       username: e.target.value,
                                    })
                                 }
                                 className="rounded-sm"
                              />
                           </div>

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

               {/* Buffer */}
               <div className="h-14"></div>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
