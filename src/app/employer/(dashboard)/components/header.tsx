'use client';

import { redirect, useRouter } from 'next/navigation';
import { BellIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  const router = useRouter();

  return (
    <div className="bg-white flex justify-between h-18 mb-8 p-6">
      {/*Title */}
      <div className="font-[Space Grotesk] text-[20px]">Hirewithtess</div>

      {/* Right Section */}
      <div className="flex gap-2 items-center">
        {/* Search */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search"
            className="pl-8 w-full md:w-2/3 lg:w-[300px]"
          />
        </div>

        {/* Notification */}
        <div className="bg-[#A2A1A81A] w-[50px] h-[50px] rounded-xl flex items-center justify-center">
          <BellIcon />
        </div>

        {/* Profile */}
        <div
          onClick={() => router.push('/employer/profile/account-details')}
          className="flex w-full sm:w-[184px] h-[50px] border rounded-xl items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="p-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {/* {(session?.user?.name || "IN")} */}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="pl-2">
            <h1 className="font-semibold">Name</h1>
            <p className="text-sm text-[#A2A1A8]">Designation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
