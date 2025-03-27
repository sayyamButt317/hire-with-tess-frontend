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
            <form onSubmit={onSubmit} className="relative w-full max-w-xl">
                <Input
                    className="w-full h-14 bg-white rounded-full placeholder:text-gray-500 pl-4 sm:pl-6 pr-16 sm:pr-20 text-sm sm:text-base"
                    placeholder="Describe what you need..."
                    onChange={onChange}
                />
                <Button
                    type="submit"
                    className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 h-12 bg-orange-400 text-white px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base"
                >
                    Generate
                </Button>
            </form>
        </div>
    );
}
