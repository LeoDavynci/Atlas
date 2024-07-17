import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SessionPage = () => {
   return (
      <>
         {/* Top Bar */}
         <div className="z-10 flex flex-col fixed top-0 left-0 right-0 h-40 w-full bg-custom-accent rounded-b-lg p-6 outer-shadow">
            <h1 className="mfont1">PUSH</h1>
            <div className="flex flex-row justify-between h-16 pt-2 mfont4 gap-3">
               <Button className="lightbutton h-full w-1/3">
                  <div className="flex flex-row justify-center items-center gap-1 ">
                     <IoIosAddCircleOutline className="h-8 w-8" />
                     <p>Add</p>
                  </div>
               </Button>

               <Button className="lightbutton h-full w-1/3">
                  <div className="flex flex-row justify-center items-center p-2 gap-1 ">
                     <IoTimeOutline className="h-8 w-8" />
                     <p>Timer</p>
                  </div>
               </Button>

               <Button className="lightbutton h-full w-1/3">
                  <div className="flex flex-row justify-center items-center p-2 gap-1 ">
                     <IoMdCheckmarkCircleOutline className="h-8 w-8" />
                     <p>Finish</p>
                  </div>
               </Button>
            </div>
         </div>

         {/* Content */}
         <div className="p-6 pt-44  h-full ">
            {/* Movement */}
            <div className="h-76 p-3 lightbox mt-3">
               {/* Name */}
               <div className="flex flex-row gap-3 items-center">
                  <div className="h-11 w-11 accentbox2"></div>
                  <h1 className="mfont29">BENCHPRESS</h1>
               </div>
               {/* Label */}
               <div className="flex flex-row mt-3 ml-3 w-9/12 justify-between mfont39">
                  <p>Set</p>
                  <p className="relative right-5">Previous</p>
                  <p>LBS</p>
                  <p>Reps</p>
               </div>
               {/* Sets */}
               <div className="flex flex-col mt-1 ml-2">
                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>
               </div>
               {/* Add Set */}
               <div className="pt-3">
                  <Button className="accentbutton w-full">
                     <p className="mfont35">Add Set</p>
                  </Button>
               </div>
            </div>

            {/* Movement */}
            <div className="h-76 p-3 lightbox mt-3">
               {/* Name */}
               <div className="flex flex-row gap-3 items-center">
                  <div className="h-11 w-11 accentbox2"></div>
                  <h1 className="mfont29">BENCHPRESS</h1>
               </div>
               {/* Label */}
               <div className="flex flex-row mt-3 ml-3 w-9/12 justify-between mfont39">
                  <p>Set</p>
                  <p className="relative right-5">Previous</p>
                  <p>LBS</p>
                  <p>Reps</p>
               </div>
               {/* Sets */}
               <div className="flex flex-col mt-1 ml-2">
                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>
               </div>
               {/* Add Set */}
               <div className="pt-3">
                  <Button className="accentbutton w-full">
                     <p className="mfont35">Add Set</p>
                  </Button>
               </div>
            </div>

            {/* Movement */}
            <div className="h-76 p-3 lightbox mt-3">
               {/* Name */}
               <div className="flex flex-row gap-3 items-center">
                  <div className="h-11 w-11 accentbox2"></div>
                  <h1 className="mfont29">BENCHPRESS</h1>
               </div>
               {/* Label */}
               <div className="flex flex-row mt-3 ml-3 w-9/12 justify-between mfont39">
                  <p>Set</p>
                  <p className="relative right-5">Previous</p>
                  <p>LBS</p>
                  <p>Reps</p>
               </div>
               {/* Sets */}
               <div className="flex flex-col mt-1 ml-2">
                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3 ">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>

                  {/* Set */}
                  <div className="flex flex-row mt-1 justify-between mfont3">
                     <div className="flex flex-row justify-between w-10/12 h-8">
                        <div className="flex flex-col justify-center items-center w-6 ">
                           <p>1</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-2 w-20">
                           <p>120LBS X10</p>
                        </div>
                        <div className="flex flex-col justify-center relative right-1 w-10">
                           <p>120</p>
                        </div>
                        <div className=" flex flex-col justify-center relative right-2 w-10">
                           <p>12</p>
                        </div>
                     </div>

                     <Button className="graybutton h-8 w-8"></Button>
                  </div>
               </div>
               {/* Add Set */}
               <div className="pt-3">
                  <Button className="accentbutton w-full">
                     <p className="mfont35">Add Set</p>
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

export default SessionPage;
