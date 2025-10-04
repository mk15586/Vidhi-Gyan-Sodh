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
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <div className="container mx-auto flex h-16 justify-around">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex w-full flex-col items-center justify-center text-sm font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="mb-1 h-6 w-6" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Spacer for bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default BottomNav;
