import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, Settings, ShoppingBag, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { reset } from '@/store/features/auth/user.slice'
import { UserLogout } from '@/store/features/auth/user.slice'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const name = user?.user?.username;
  let prename = "";
  for (let index = 0; index < name?.length; index++) {
    if (index === 0 || name[index - 1] === " ") {
      prename += name[index];
    }
  }
  function moveToNext(response) {
    console.log(response)
    if (response.success) {
      toast.success(response.message)
      navigate("/login")
    } else {
      toast.error(response)
      dispatch(reset())
    }
  }
  const logoutHandler = () => {
    dispatch(UserLogout({ moveToNext }))
  }

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
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-white">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="font-bold">ACME Store</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>Home</Link>
                  <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>About</Link> <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>Contact</Link>
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
            <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>Home</Link>
            <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>About</Link> <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary'>Contact</Link>
          </nav>

          <div className="flex items-center gap-4 md:ml-auto">
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
  )
}

export default Header
