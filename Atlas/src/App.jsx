import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import PageLayout from "./PageLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/AuthPage/Login";
import SignUp from "./pages/AuthPage/SignUp";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";
import SessionPage from "./pages/SessionPage/SessionPage";
import ExerciseDetail from "./pages/SearchPage/ExerciseDetail";
import { Loader2 } from "lucide-react";
import NewRoutinePage from "./pages/WorkoutsPage/NewRoutinePage ";

const App = () => {
   const { isLoggedOut, user, isLoading } = UserAuth();

   if (isLoading) {
      return (
         <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-black to-custom-dark">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
         </div>
      );
   }

   return (
      <PageLayout>
         <Routes>
            <Route
               path="/login"
               element={isLoggedOut ? <Login /> : <Navigate to="/home" />}
            />
            <Route
               path="/signup"
               element={isLoggedOut ? <SignUp /> : <Navigate to="/home" />}
            />
            <Route
               path="/"
               element={isLoggedOut ? <LandingPage /> : <Navigate to="/home" />}
            />
            <Route
               path="/home"
               element={
                  !isLoggedOut ? <SearchPage /> : <Navigate to="/login" />
               }
            />
            <Route
               path="/workouts"
               element={
                  !isLoggedOut ? <WorkoutsPage /> : <Navigate to="/login" />
               }
            />
            <Route
               path="/profile"
               element={
                  !isLoggedOut ? <ProfilePage /> : <Navigate to="/login" />
               }
            />
            <Route
               path="/dash"
               element={!isLoggedOut ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
               path="/session/:routineId"
               element={
                  !isLoggedOut ? <SessionPage /> : <Navigate to="/login" />
               }
            />
            <Route
               path="/exercises/exercise/:id"
               element={
                  !isLoggedOut ? <ExerciseDetail /> : <Navigate to="/login" />
               }
            />
            <Route
               path="/new-routine"
               element={
                  !isLoggedOut ? <NewRoutinePage /> : <Navigate to="/login" />
               }
            />
            <Route path="/*" element={<Navigate to="/" />} />
         </Routes>
      </PageLayout>
   );
};

export default App;
