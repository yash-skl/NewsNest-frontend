import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { Popover, PopoverContent } from "../components/ui/popover";
import { PopoverTrigger } from "../components/ui/popover";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-black text-white flex flex-col sm:flex-row p-2 sm:p-4 w-full justify-between items-center sm:items-center gap-2 sm:gap-0">
      <div className="bg-black text-white font-bold text-sm sm:text-xs md:text-base lg:text-xl ml-0 sm:ml-7 order-1 sm:order-1">
        <Link to="/">NewsNest</Link>
      </div>
      <div className="flex gap-2 sm:gap-3 md:gap-4 items-center order-3 sm:order-2 w-full sm:w-auto justify-center sm:justify-start">
        <ul className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-14 items-center font-medium text-xs sm:text-sm md:text-base">
          <li>
            <Link
              to="/"
              className="text-white hover:text-[#00FF88] whitespace-nowrap"
            >
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/bookmarks"
                className="text-white hover:text-[#00FF88] whitespace-nowrap"
              >
                Bookmarks
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="order-2 sm:order-3">
        <ul className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center sm:justify-end">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-[#00FF88] text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Login
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link to="/register">
                  <Button className="bg-[#00FF88] hover:bg-[#00ff62] hover:translate-y-[-1px] transition-all duration-300 text-black font-bold text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2">
                    Register
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="w-full justify-start"
                    >
                      <LogOut />
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              </li>
              <li>
                <Button
                  onClick={logoutHandler}
                  variant="link"
                  className="text-white"
                >
                  <LogOut />
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
