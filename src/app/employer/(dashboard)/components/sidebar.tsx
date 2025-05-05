'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';

export interface SidebarLink {
  label: string;
  route: string;
  img: string;
}

export interface SidebarProps {
  links: SidebarLink[];
  onLogout?: () => void;
}

export default function Sidebar({ links, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (route: string) => {
    if (pathname !== route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    onLogout?.();
    router.push('/login');
  };

  const renderLink = (link: SidebarLink) => {
    const isSelected =
      link.route === pathname ||
      (link.route !== '/login' && pathname.includes(link.route));

    return (
      <button
        key={link.route}
        onClick={() => handleClick(link.route)}
        className={cn(
          'group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out outline-none relative',
          isSelected
            ? 'bg-[#FFFAF4] text-[#f7941D] font-semibold shadow-sm'
            : 'hover:bg-gray-100 hover:text-orange-500',
          'focus:ring-2 focus:ring-orange-300',
        )}
        aria-current={isSelected ? 'page' : undefined}
      >
        <span className="relative w-6 h-6 flex items-center justify-center">
          <Image
            src={link.img}
            alt="icon"
            fill
            className={cn('object-contain', isSelected ? 'filter-orange' : '')}
          />
        </span>
        <span>{link.label}</span>
        <span
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 bg-orange-400 transition-all',
            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
          )}
        />
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[250px] p-6 bg-white rounded-2xl">
        <nav className="flex flex-col gap-2 text-sm font-light">
          {links.map(renderLink)}
          {onLogout && (
            <Button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-300"
              variant="ghost"
            >
              <LogOut /> Logout
            </Button>
          )}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-[250px] p-6 bg-white">
            <nav className="flex flex-col gap-2 text-sm font-light">
              {links.map(renderLink)}
              {onLogout && (
                <Button
                  onClick={handleLogout}
                  className="mt-6 w-full bg-red-50 text-red-700 hover:bg-red-100"
                  variant="ghost"
                >
                  Logout
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
