'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Settings,
  LogOut,
  BookOpen,
  X,
  Bell,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { courses } from '@/lib/courses';
import { Separator } from './ui/separator';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/#about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
];

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

const Header = () => {
  const cartItems = courses.slice(0, 3);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
           <div className="hidden md:flex w-full max-w-sm items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end" alignOffset={-16}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                </div>
                <Separator />
                <div className="grid gap-4 max-h-60 overflow-y-auto">
                    <div className="flex items-start gap-4">
                        <div className="flex-grow">
                            <h5 className="text-sm font-semibold leading-tight">New Course Alert!</h5>
                            <p className="text-sm text-muted-foreground">"Advanced Criminal Law" is now available.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-grow">
                            <h5 className="text-sm font-semibold leading-tight">Your progress</h5>
                            <p className="text-sm text-muted-foreground">You are 50% through "Intro to Constitution".</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex-grow">
                            <h5 className="text-sm font-semibold leading-tight">Discount Offer</h5>
                            <p className="text-sm text-muted-foreground">Get 20% off on your next purchase.</p>
                        </div>
                    </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end" alignOffset={-16}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Shopping Cart</h4>
                  <p className="text-sm text-muted-foreground">
                    You have {cartItems.length} items in your cart.
                  </p>
                </div>
                <Separator />
                <div className="grid gap-4 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => {
                        const image = PlaceHolderImages.find(p => p.id === item.imageId);
                        return (
                            <div key={item.id} className="flex items-start gap-4">
                                <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                                    {image && <Image src={image.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={image.imageHint}/>}
                                </div>
                                <div className="flex-grow">
                                    <h5 className="text-sm font-semibold leading-tight">{item.title}</h5>
                                    <p className="text-sm text-primary font-medium">₹{item.price}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                                    <X className="h-3 w-3"/>
                                </Button>
                            </div>
                        )
                    })}
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <Button asChild>
                    <Link href="/cart">View Cart & Checkout</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                {userAvatar && (
                    <Image
                        src={userAvatar.imageUrl}
                        alt={userAvatar.description}
                        fill
                        data-ai-hint={userAvatar.imageHint}
                        className="rounded-full object-cover"
                    />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Advocate</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    advocate@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account"><User className="mr-2 h-4 w-4" />Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 <Link href="/courses"><BookOpen className="mr-2 h-4 w-4" />My Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account"><Heart className="mr-2 h-4 w-4" />Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/account"><Settings className="mr-2 h-4 w-4" />Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
