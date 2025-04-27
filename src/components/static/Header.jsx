import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, Settings, ShoppingBag, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { reset } from "@/store/features/auth/user.slice";
import { UserLogout } from "@/store/features/auth/user.slice";
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
    console.log(response);
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

  let style = ({ isActive }) => {
    return isActive
      ? { color: "red", fontWeight: 600 }
      : { color: "black", fontWeight: 400 };
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(cart);
    };
    updateCartCount();
    window.addEventListener("updateCart", updateCartCount)
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 justify-between items-center px-4 sm:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] sm:w-[300px] bg-white"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="font-bold">ACME Store</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {user?.user?.role === "user" && (
                    <>
                      <NavLink to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                        Home
                      </NavLink>
                      <NavLink to="/men" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                        Men
                      </NavLink>{" "}
                      <NavLink to="/women" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                        Women
                      </NavLink>
                      <NavLink to="/children" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                        Children
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center justify-between gap-2 md:mr-6">
            <ShoppingBag className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">ACME Store</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6">
            {user?.user?.role === "user" && (
              <>
                <NavLink to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                  Home
                </NavLink>
                <NavLink to="/men" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                  Men
                </NavLink>{" "}
                <NavLink to="/women" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                  Women
                </NavLink>
                <NavLink to="/children" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" style={style}>
                  Children
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4 md:ml-auto">
            {
              user?.user?.role === "user" &&
              <div className="bg-gray-200 px-1 py-1 rounded-full relative">
                <div className="cart">
                  <IoCart size={30} />
                </div>
                {
                  cartData.length > 0 &&
                  <div className="cart-num absolute top-[-5px] right-[-10px] bg-red-500 px-2 rounded-full text-white">{cartData.length}</div>
                }
              </div>
            }
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>{prename}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logoutHandler}>
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
