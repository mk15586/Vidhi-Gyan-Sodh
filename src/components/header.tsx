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
  Check,
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { courses } from '@/lib/courses';
import { Separator } from './ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/#about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
];

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

const Header = () => {
  const cartItems = courses.slice(0, 3);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const notifications = [
      { id: 1, title: 'New Course Alert!', description: '"Advanced Criminal Law" is now available.', read: false },
      { id: 2, title: 'Your progress', description: 'You are 50% through "Intro to Constitution".', read: false },
      { id: 3, title: 'Discount Offer', description: 'Get 20% off on your next purchase.', read: true },
  ]
  const unreadCount = notifications.filter(n => !n.read).length;


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center">
            <Image src="/VGS-logo.png" alt="Vidhi Gyan Sodh Logo" width={120} height={32} priority />
        </Link>
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
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
               <Card className="border-0 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-headline text-lg">Notifications</CardTitle>
                        <CardDescription>You have {unreadCount} unread messages.</CardDescription>
                    </div>
                     <Button variant="ghost" size="sm">Mark all as read</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border max-h-80 overflow-y-auto">
                        {notifications.map(notification => (
                            <div key={notification.id} className={`p-4 hover:bg-muted/50 ${!notification.read ? 'bg-primary/5' : ''}`}>
                                <div className="flex items-start gap-3">
                                    {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>}
                                    <div className="flex-1 ml-3">
                                        <p className="font-semibold text-sm leading-tight">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                        <Check className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
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
