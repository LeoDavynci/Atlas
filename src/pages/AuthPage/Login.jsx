import React, { useState } from "react";
import {
   Card,
   CardHeader,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "@/functions/auth";

const Login = () => {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();

   const handleLogin = () => {
      signIn(email, password);
   };

   return (
      <div className="flex center flex-col">
         {/* Logo */}
         <div className="flex items-center justify-center gap-2 pb-6">
            <div className="">
               <img src="/AtlasW.png" alt="Atlas Logo" className="w-16 h-16" />
            </div>
            <h2 className="mfont0">ATLAS</h2>
         </div>

         {/* Form */}
         <Card className="rounded-md items-center justify-center light p-0 inner-shadow">
            <CardContent>
               <div className=" w-64">
                  {/* Text */}
                  <div className="">
                     <h1 className="mfont2 pt-8">Log In</h1>
                     <p className="mfont4 pt-1">
                        Don't have an account?{" "}
                        <a
                           href="/signup"
                           className="mfont4 hover:underline font-medium"
                        >
                           Sign up
                        </a>
                     </p>
                  </div>
                  <form className="space-y-2 mt-4">
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
                           className="rounded-sm accentbutton items-center justify-center w-full"
                           onClick={handleLogin}
                        >
                           Log In
                        </Button>
                     </div>
                  </form>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Login;
