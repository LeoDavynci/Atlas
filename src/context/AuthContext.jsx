import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export const UserAuth = () => {
   const context = useContext(UserContext);
   if (context === undefined) {
      throw new Error("useUserAuth must be used within a AuthContextProvider");
   }
   return context;
};

const AuthContextProvider = ({ children }) => {
   const [isLoggedOut, setIsLoggedOut] = useState(true);
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         if (currentUser) {
            setIsLoggedOut(false);
            const userDocRef = doc(db, "users", currentUser.uid);
            onSnapshot(userDocRef, (doc) => {
               setUser(doc.data() || null);
               setIsLoading(false);
            });
            console.log("User Authenticated");
         } else {
            setIsLoggedOut(true);
            setUser(null);
            setIsLoading(false);
         }
      });
      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <UserContext.Provider
         value={{
            isLoggedOut,
            user,
            isLoading,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

export default AuthContextProvider;
