import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();
   const isAuthPage =
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/" ||
      pathname === "/new-routine" ||
      pathname.startsWith("/session/") ||
      pathname.startsWith("/exercises/exercise/");

   return (
      <div className={`flex flex-col min-h-screen`}>
         {!isAuthPage && (
            <div className="sticky bottom-0-0 z-50  shadow-md">
               <NavBar />
            </div>
         )}

         <main className="flex-1 w-full bg-gradient-to-tr from-black to-custom-dark">
            {children}
         </main>
      </div>
   );
};

export default PageLayout;
