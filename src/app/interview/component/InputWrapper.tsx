import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface InputWrapperProps {
    items: string[];
    onRemove: (index: number) => void;
}

export default function InputWrapper({ items, onRemove }: InputWrapperProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
                <div key={index} className="relative w-full sm:w-auto">
                    <Input
                        value={item}
                        readOnly
                        className="w-full sm:w-auto pr-10 border-[#E2E8F0] rounded-3xl text-black cursor-not-allowed font-[Open Sans] "
                    />
                    <button
                        onClick={() => onRemove(index)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
