'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookCopy, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/courses', icon: BookCopy, label: 'Courses' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="container mx-auto flex justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center w-full text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-16" /> 
    </nav>
  );
};

export default BottomNav;
