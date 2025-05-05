'use client';

import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { sidebarProfileItem } from '@/app/employer/profile/Constants/profileitem';
import { useEffect, useState } from 'react';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleClick = (route: string) => {
    setActivePath(route);
    router.push(route);
  };

  return (
    <div className={`bg-white border-r md:block w-[250px] rounded-xl p-6`}>
      <nav className="grid items-start gap-4 text-sm font-light">
        <div className="flex flex-col items-center">
          <Avatar className="w-40 h-40 border-4 border-[#F7941D]">
            {/* <AvatarImage src={user?.img} alt={user?.name} />
            <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback> */}
          </Avatar>
          <div className="text-center mt-4">
            {/* <h1 className="font-semibold text-[#4B4B4B]">{user?.name}</h1>
            {user?.role && <p className="text-sm font-light">{user?.role}</p>} */}
          </div>
          <hr className="my-4 border-gray-300 " />
        </div>
        {sidebarProfileItem.map((link) => {
          const isSelected =
            link.route === activePath ||
            (link.route !== '/login' &&
              link.route.length > 1 &&
              activePath.includes(link.route));
          return (
            <Link
              href={link.route}
              key={link.route}
              onClick={() => handleClick(link.route)}
            >
              <div
                className={cn(
                  ' flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer',
                  isSelected && 'bg-[#f7941D] text-white',
                )}
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={link.img}
                    alt="icon"
                    fill
                    className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`}
                  />
                </div>
                <p className={cn(isSelected ? 'text-white' : 'text-dark')}>
                  {link.label}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
