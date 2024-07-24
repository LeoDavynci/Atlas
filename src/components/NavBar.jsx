import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TbWeight } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

const NavBar = ({ children }) => {
   const location = useLocation();

   const getIconColor = (path) => {
      return location.pathname === path ? "white" : "currentColor";
   };

   return (
      <div className="flex flex-col">
         <div className="flex-grow">{children}</div>
         <nav className="fixed bottom-0 left-0 right-0 accent outershadow2 rounded-t-md">
            <div className="flex justify-center items-center h-16">
               <Link
                  to="/home"
                  className="px-4 flex flex-col items-center mfont3 gap-1"
               >
                  <IoSearch className="w-9 h-9" color={getIconColor("/home")} />
                  <p style={{ color: getIconColor("/home") }}>Search</p>
               </Link>
               <Link
                  to="/workouts"
                  className="px-4 flex flex-col items-center mfont3 gap-1"
               >
                  <TbWeight
                     className="w-9 h-9"
                     color={getIconColor("/workouts")}
                  />
                  <p style={{ color: getIconColor("/workouts") }}>Workout</p>
               </Link>
               <Link
                  to="/profile"
                  className="px-4 flex flex-col items-center mfont3 gap-1"
               >
                  <CgProfile
                     className="w-9 h-9"
                     color={getIconColor("/profile")}
                  />
                  <p style={{ color: getIconColor("/profile") }}>Profile</p>
               </Link>
            </div>
         </nav>
      </div>
   );
};

export default NavBar;
