import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserAuth = () => {
   return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
   const [isLoggedOut, setIsLoggedOut] = useState(true);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         if (currentUser) {
            setIsLoggedOut(false);
            onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
               setUser(doc.data());
            });

            console.log("User Authenticated");
         } else {
            setIsLoggedOut(true);
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
         }}
      >
         {children}
      </UserContext.Provider>
   );
}
