import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
   return (
      <div
         className="relative h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('/Guy.png')" }}
      >
         {/* Page Content */}
         <div className="relative z-10 flex flex-col h-full text-center text-white">
            {/* Logo */}
            <div className=" relative z-10 flex items-center justify-start gap-2 pt-2 pl-2">
               <div className="">
                  <img
                     src="/AtlasW.png"
                     alt="Atlas Logo"
                     className="w-16 h-16"
                  />
               </div>
               <h2 className="mfont0">ATLAS</h2>
            </div>
            {/* Info */}
            <div className=" flex-grow flex items-center">
               <div>
                  <h1 className="mfont0 mt-3 flex pl-10 ">STRONGER.</h1>
                  <h1 className="mfont0 mt-3 flex pl-10">FASTER.</h1>
                  <h1 className="mfont0 mt-3 flex pl-10">EASIER.</h1>
                  <div className="mt-3 flex pl-10">
                     <Button
                        variant="default"
                        asChild
                        className="hover:bg-opacity-90 transition-colors duration-200"
                     >
                        <a href="/signup">Get Started</a>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         {/* Black gradient overlay on the left-hand side */}
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent w-1/2"></div>
         {/* Semi-transparent overlay */}
         <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      </div>
   );
};

export default LandingPage;
