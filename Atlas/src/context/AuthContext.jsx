import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserAuth = () => {
   return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
   const [isLoggedOut, setIsLoggedOut] = useState(true);

   return (
      <UserContext.Provider value={{ isLoggedOut }}>
         {children}
      </UserContext.Provider>
   );
}
