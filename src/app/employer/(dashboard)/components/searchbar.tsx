import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Searchbar() {
  return (
    <div className="flex justify-end mb-4">
      <div className="relative w-full md:w-2/3 lg:w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input type="search" placeholder="Search" className="pl-10 bg-white" />
      </div>
    </div>
  );
}
