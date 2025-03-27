import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Placeholder({
                                        onChange,
                                        onSubmit,
                                    }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <div className="flex justify-center w-full px-4">
            <form onSubmit={onSubmit} className="relative w-full max-w-xl sm:max-w-2xl">
                <Input
                    className="w-full h-12 sm:h-[60px] md:h-[72px] font-normal bg-white rounded-full
                    placeholder:text-gray-500 pl-4 sm:pl-6 pr-16 sm:pr-20
                    text-xs sm:text-sm md:text-base lg:text-lg"
                    placeholder="Describe what you need..."
                    onChange={onChange}
                />
                <Button
                    type="submit"
                    className="absolute font-semibold cursor-pointer right-2 sm:right-3 top-1/2
                    transform -translate-y-1/2 h-10 sm:h-[50px] md:h-[60px] w-[100px] sm:w-[120px] md:w-[140px]
                    bg-orange-400 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm md:text-base"
                >
                    Generate
                </Button>
            </form>
        </div>
    );
}
