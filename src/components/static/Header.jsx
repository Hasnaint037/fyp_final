import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut, Menu, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { reset, UserLogout } from "@/store/features/auth/user.slice";
import { IoCart } from "react-icons/io5";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [cartData, setCartData] = useState([]);
  const name = user?.user?.username;
  let prename = "";

  for (let index = 0; index < name?.length; index++) {
    if (index === 0 || name[index - 1] === " ") {
      prename += name[index];
    }
  }

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response);
      dispatch(reset());
    }
  }

  const logoutHandler = () => {
    dispatch(UserLogout({ moveToNext }));
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(cart);
    };
    updateCartCount();
    window.addEventListener("updateCart", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-black shadow-lg">
        <div className="container flex h-16 justify-between items-center px-4 sm:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] sm:w-[300px] bg-white"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-emerald-600" />
                  <span className="font-bold text-emerald-700 text-lg">
                    TechNova
                  </span>
                </div>
                <nav className="flex flex-col gap-4">
                  {user?.user?.role === "user" && (
                    <>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-emerald-700 underline font-semibold"
                              : "text-gray-500 hover:text-emerald-600"
                          }`
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/mobile"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-emerald-700 underline font-semibold"
                              : "text-gray-500 hover:text-emerald-600"
                          }`
                        }
                      >
                        Mobile
                      </NavLink>
                      <NavLink
                        to="/laptop"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-emerald-700 underline font-semibold"
                              : "text-gray-500 hover:text-emerald-600"
                          }`
                        }
                      >
                        Laptop
                      </NavLink>
                      <NavLink
                        to="/others"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-emerald-700 underline font-semibold"
                              : "text-gray-500 hover:text-emerald-600"
                          }`
                        }
                      >
                        Others
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand Logo */}
          <div className="flex items-center justify-between gap-2 md:mr-6">
            <ShoppingBag className="h-6 w-6 text-emerald-500" />
            <span className="hidden sm:inline-block text-white text-xl font-extrabold tracking-wide">
              TechNova
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6">
            {user?.user?.role === "user" && (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white underline font-semibold"
                        : "text-emerald-200 hover:text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/mobile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white underline font-semibold"
                        : "text-emerald-200 hover:text-white"
                    }`
                  }
                >
                  Mobile
                </NavLink>
                <NavLink
                  to="/laptop"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white underline font-semibold"
                        : "text-emerald-200 hover:text-white"
                    }`
                  }
                >
                  Laptop
                </NavLink>
                <NavLink
                  to="/others"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white underline font-semibold"
                        : "text-emerald-200 hover:text-white"
                    }`
                  }
                >
                  Others
                </NavLink>
              </>
            )}
          </nav>

          {/* Cart & Avatar */}
          <div className="flex items-center gap-4 md:ml-auto">
            {user?.user?.role === "user" && (
              <div className="relative bg-emerald-600 px-2 py-1 rounded-full hover:scale-105 transition-transform">
                <div
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer"
                >
                  <IoCart size={28} className="text-white" />
                </div>
                {cartData.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartData.length}
                  </div>
                )}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-emerald-700 text-white font-semibold">
                      {prename}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#000000] text-white shadow-lg"
              >
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="hover:bg-[#000000] hover:text-white transition-colors cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
