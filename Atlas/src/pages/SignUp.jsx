import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardHeader,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
   name: z.string().min(2, "Name must be at least 2 characters."),
   username: z.string().min(2, "Username must be at least 2 characters."),
   email: z.string().email("Invalid email address."),
   password: z.string().min(6, "Password must be at least 6 characters."),
});

const SignUp = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(formSchema),
   });

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className="flex center flex-col">
         {/* Logo */}
         <div className="flex items-center justify-center gap-2 p-3">
            <img src="/AtlasW.png" alt="Atlas Logo" className="w-10 h-10" />
            <h2 className="mfont1">ATLAS</h2>
         </div>
         {/* Form */}
         <Card className="rounded-md flex items-center justify-center p-10 light ">
            <CardContent>
               <div>
                  <div>
                     <h1 className="mfont2">Sign Up</h1>
                     <p className="mfont4">
                        Already have an account?{" "}
                        <a
                           href="/login"
                           className="mfont4 hover:underline font-medium"
                        >
                           Log In
                        </a>
                     </p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                     {/* Name */}
                     <div>
                        <text className="mfont4">Name</text>
                        <Input
                           className="rounded-sm customborder"
                           id="name"
                           {...register("name")}
                        />
                        {errors.name && (
                           <p className="text-red-500 text-sm">
                              {errors.name.message}
                           </p>
                        )}
                     </div>
                     {/* Username */}
                     <div>
                        <text className="mfont4">Username</text>
                        <Input
                           className="rounded-sm customborder"
                           id="username"
                           {...register("username")}
                        />
                        {errors.username && (
                           <p className="text-red-500 text-sm">
                              {errors.username.message}
                           </p>
                        )}
                     </div>
                     {/* Email */}
                     <div>
                        <text className="mfont4">Email</text>
                        <Input
                           className="rounded-sm customborder"
                           id="email"
                           type="email"
                           {...register("email")}
                        />
                        {errors.email && (
                           <p className="text-red-500 text-sm">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     {/* Password */}
                     <div>
                        <text className="mfont4">Password</text>
                        <Input
                           className="rounded-sm customborder"
                           id="password"
                           type="password"
                           {...register("password")}
                        />
                        {errors.password && (
                           <p className="text-red-500 text-sm">
                              {errors.password.message}
                           </p>
                        )}
                     </div>

                     {/* Submit Button */}
                     <div className="">
                        <Button
                           type="submit"
                           className="rounded-sm accent items-center justify-center w-full"
                        >
                           Sign Up
                        </Button>
                     </div>
                  </form>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default SignUp;
