import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface SkillState {
    skills: string[];
    isEditable: boolean;
    questions: string[];
    editableQuestionIndex: number | null;
    cancel: boolean;

    setCancel: (value: boolean) => void;
    setIsEditable: (value: boolean) => void;
    setSkills: (value: string[]) => void;
    removeSkills: (index: number) => void;

    setQuestions: (value: string[]) => void;
    setEditableQuestionIndex: (index: number | null) => void;
    updateQuestion: (index: number, value: string) => void;
}

export const useSkillStore = create<SkillState>()(
    devtools(
        persist(
            (set) => ({
                skills: [],
                isEditable: false,
                questions: [],
                editableQuestionIndex: null,
                cancel: false,

                setCancel: (value: boolean) => set({ cancel: value }),
                setIsEditable: (value) => set({ isEditable: value }),
                setSkills: (value) => set({ skills: value }),
                removeSkills: (indexToRemove) =>
                    set((state) => ({
                        skills: state.skills.filter((_, index) => index !== indexToRemove),
                    })),
                setQuestions: (value) => set({ questions: value }),
                setEditableQuestionIndex: (index) => set({ editableQuestionIndex: index }),
                updateQuestion: (index, value) =>
                    set((state) => ({
                        questions: state.questions.map((cq, i) =>
                            i === index ? value : cq
                        ),
                    })),
            }),
            { name: "Response-storage", storage: createJSONStorage(() => localStorage) }
        )
    )
);
