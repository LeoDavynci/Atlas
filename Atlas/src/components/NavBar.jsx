import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ children }) => {
   return (
      <div>
         <nav>
            <Link to={"/home"}>Home</Link>
            <Link to={"/workouts"}>Workouts</Link>
            <Link to={"/profile"}>Profile</Link>
         </nav>
         {children}
      </div>
   );
};

export default NavBar;
