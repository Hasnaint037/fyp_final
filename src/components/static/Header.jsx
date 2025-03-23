import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, Settings, ShoppingBag, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Link } from 'react-router-dom'

function Header() {
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
