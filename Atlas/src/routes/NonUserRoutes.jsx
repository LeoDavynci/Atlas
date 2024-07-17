import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/AuthPage/Login";
import SignUp from "@/pages/SignUp";
import React from "react";
import { Route, Routes } from "react-router-dom";

const NonUserRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/*" element={<LandingPage />}></Route>
         </Routes>
      </div>
   );
};

export default NonUserRoutes;
