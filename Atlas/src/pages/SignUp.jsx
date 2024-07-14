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
      <div className="flex  items-center justify-center min-h-screen ">
         <Card className="w-[350px]">
            <CardHeader>
               <div className="flex items-center space-x-2">
                  <img
                     src="/path-to-your-logo.png"
                     alt="Atlas Logo"
                     className="w-8 h-8"
                  />
                  <h2 className="text-2xl font-bold">ATLAS</h2>
               </div>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                     <Label htmlFor="name">Name</Label>
                     <Input id="name" {...register("name")} />
                     {errors.name && (
                        <p className="text-red-500 text-sm">
                           {errors.name.message}
                        </p>
                     )}
                  </div>
                  <div>
                     <Label htmlFor="username">Username</Label>
                     <Input id="username" {...register("username")} />
                     {errors.username && (
                        <p className="text-red-500 text-sm">
                           {errors.username.message}
                        </p>
                     )}
                  </div>
                  <div>
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" {...register("email")} />
                     {errors.email && (
                        <p className="text-red-500 text-sm">
                           {errors.email.message}
                        </p>
                     )}
                  </div>
                  <div>
                     <Label htmlFor="password">Password</Label>
                     <Input
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
                  <Button type="submit" className="w-full">
                     Sign Up
                  </Button>
               </form>
            </CardContent>
            <CardFooter className="justify-center">
               <p className="text-sm text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                     Log In
                  </a>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
};

export default SignUp;
