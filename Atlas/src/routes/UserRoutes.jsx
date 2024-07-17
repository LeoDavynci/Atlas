import NavBar from "@/components/NavBar";
import PageLayout from "@/PageLayout";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SessionPage from "@/pages/SessionPage/SessionPage";
import WorkoutsPage from "@/pages/WorkoutsPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
   return (
      <Routes>
         <Route element={<PageLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<HomePage />} />
         </Route>
         <Route path="/session" element={<SessionPage />} />
      </Routes>
   );
};

export default UserRoutes;
