import NavBar from "@/components/NavBar";
import PageLayout from "@/PageLayout";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import ExerciseDetail from "@/pages/SearchPage/ExerciseDetail";
import SearchPage from "@/pages/SearchPage/SearchPage";
import SessionPage from "@/pages/SessionPage/SessionPage";
import NewRoutinePage from "@/pages/WorkoutsPage/NewRoutinePage ";
import WorkoutsPage from "@/pages/WorkoutsPage/WorkoutsPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const UserRoutes = () => {
   return (
      <Routes>
         <Route element={<PageLayout />}>
            {/* <Route path="/dashboard" element={<HomePage />} /> */}
            <Route path="/home" element={<SearchPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<SearchPage />} />
         </Route>
         <Route path="/session/:routineId" element={<SessionPage />} />
         <Route path="/exercises/exercise/:id" element={<ExerciseDetail />} />
         <Route path="/new-routine" element={<NewRoutinePage />} />
      </Routes>
   );
};

export default UserRoutes;
