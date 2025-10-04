'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookCopy, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/courses', icon: BookCopy, label: 'Courses' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
];

const BottomNav = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isMobile) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-2 left-0 right-0 z-50 h-16 px-4 md:hidden">
        <nav className="relative flex h-full items-center justify-around rounded-full border bg-background/90 p-2 shadow-lg backdrop-blur-sm">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative z-10 flex h-12 flex-1 flex-col items-center justify-center rounded-full text-sm font-medium outline-none transition-all duration-300',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                <div className={cn(
                    "absolute inset-0 -z-10 rounded-full bg-primary transition-transform duration-300 ease-in-out",
                    isActive ? "scale-100" : "scale-0"
                )}></div>
                <Icon className="h-5 w-5" />
                <span className={cn(
                    "text-xs transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0"
                )}>{label}</span>
                 {!isActive && <span className="sr-only">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Spacer for bottom nav */}
      <div className="h-24 md:hidden" />
    </>
  );
};

export default BottomNav;
