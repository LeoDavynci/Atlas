import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
   Card,
   CardHeader,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/functions/auth";

const SignUp = () => {
   const [fullName, setFullName] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [split, setSplit] = useState(""); // Default split
   const [profilePicURL, setProfilePicURL] = useState(""); // Default empty URL

   const userData = {
      fullName,
      username,
      email,
      split,
      streak: 0,
      workouts: 0,
      profilePicURL,
      createdAt: new Date().toISOString(),
   };

   const handleCreateUser = async (e) => {
      e.preventDefault();
      if (!fullName || !username || !email || !password) {
         alert("All fields are required");
         return;
      }

      console.log("Attempting to sign up with:", {
         email,
         password,
         fullName,
         username,
      });

      try {
         const user = await signUp(email, password, userData);
         console.log("Sign up successful:", user);
         // Redirect or show success message
      } catch (error) {
         console.error("Sign up error:", error.code, error.message);
         alert(error.message);
      }
   };

   return (
      <>
         <div className="flex center flex-col">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 pb-6">
               <div className="">
                  <img
                     src="/AtlasW.png"
                     alt="Atlas Logo"
                     className="w-16 h-16"
                  />
               </div>
               <h2 className="mfont0">ATLAS</h2>
            </div>
            {/* Form */}
            <Card className="rounded-md items-center justify-center light p-0 inner-shadow">
               <CardContent>
                  <div className=" w-64">
                     {/* Text */}
                     <div className="">
                        <h1 className="mfont2 pt-8">Sign Up</h1>
                        <p className="mfont4 pt-1">
                           Already have an account?{" "}
                           <a
                              href="/login"
                              className="mfont4 hover:underline font-medium"
                           >
                              Log In
                           </a>
                        </p>
                     </div>
                     <form className="space-y-2 mt-4">
                        {/* Name */}
                        <div>
                           <p className="mfont4">Name</p>
                           <Input
                              className="rounded-sm customborder"
                              id="fullName"
                              onChange={(e) => {
                                 setFullName(e.target.value);
                              }}
                           />
                        </div>
                        {/* Username */}
                        <div>
                           <p className="mfont4">Username</p>
                           <Input
                              className="rounded-sm customborder"
                              id="username"
                              onChange={(e) => {
                                 setUsername(e.target.value);
                              }}
                           />
                        </div>
                        {/* Email */}
                        <div>
                           <p className="mfont4">Email</p>
                           <Input
                              className="rounded-sm customborder"
                              id="email"
                              type="email"
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                           />
                        </div>
                        {/* Password */}
                        <div>
                           <p className="mfont4">Password</p>
                           <Input
                              className="rounded-sm customborder"
                              id="password"
                              type="password"
                              onChange={(e) => {
                                 setPassword(e.target.value);
                              }}
                           />
                        </div>

                        {/* Submit Button */}
                        <div className="pb-1 pt-5">
                           <Button
                              type="button"
                              className="rounded-sm accentbutton items-center justify-center w-full  "
                              onClick={handleCreateUser}
                           >
                              Sign Up
                           </Button>
                        </div>
                     </form>
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   );
};

export default SignUp;
