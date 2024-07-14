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

const Login = () => {
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
                           Sign Up
                        </a>
                     </p>
                  </div>
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="space-y-2 mt-4"
                  >
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
                     <div className="pb-1 pt-5">
                        <Button
                           type="submit"
                           className="rounded-sm accent items-center justify-center w-full hover:bg-accent2 "
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
