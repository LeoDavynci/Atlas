import NavBar from "@/components/NavBar";
import HomePage from "@/pages/HomePage";
import SessionPage from "@/pages/SessionPage";
import WorkoutsPage from "@/pages/WorkoutsPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
   return (
      <div>
         <NavBar>
            <Routes>
               <Route path="/dashboard" element={<HomePage />}></Route>
               <Route path="/workouts" element={<WorkoutsPage />}></Route>
               <Route path="/session" element={<SessionPage />}></Route>
            </Routes>
         </NavBar>
      </div>
   );
};

export default UserRoutes;
