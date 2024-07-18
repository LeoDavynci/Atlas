import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TbWeight } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const NavBar = ({ children }) => {
   return (
      <div className=" flex flex-col">
         <div className="flex-grow">{children}</div>
         <nav className="fixed bottom-0 left-0 right-0 accent outershadow2 rounded-t-md">
            <div className="flex justify-center items-center h-16">
               <Link to="/dashboard" className="px-4">
                  <GoHome className="w-9 h-9" />
               </Link>
               <Link to="/workouts" className="px-4">
                  <TbWeight className="w-9 h-9" />
               </Link>
               <Link to="/profile" className="px-4">
                  <CgProfile className="w-9 h-9" />
               </Link>
            </div>
         </nav>
      </div>
   );
};

export default NavBar;
