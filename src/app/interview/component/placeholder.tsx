import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Placeholder({
  onChange,
  onSubmit,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-2xl">
      <Input
        className="w-full text-gray-900 h-12 bg-white rounded-full placeholder-gray-500 pr-14"
        placeholder="Describe what you need..."
        onChange={onChange} 
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white px-4 py-2 rounded-full"
      >
        Generate
      </Button>
    </form>
  );
}
