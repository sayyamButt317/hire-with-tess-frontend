import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Skills {
    skills: string[];
    setSkills: (value: string[]) => void;
    removeSkills: (index: number) => void;
}

export const useSkillStore = create<Skills>()(
    devtools(
        persist(
            (set) => ({
                skills: [],
                setSkills: (value) => set({ skills: [...value] }),
                removeSkills: (indexToRemove) =>
                    set((state) => ({
                        skills: [...state.skills.filter((_, index) => index !== indexToRemove)],
                    })),
            }),
            { name: "input-storage" }
        )
    )
);
