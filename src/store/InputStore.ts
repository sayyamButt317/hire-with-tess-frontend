import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SkillState {
    skills: string[];
    isEditable: boolean;
    questions: string[];
    editableQuestionIndex: number | null;

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
                        questions: state.questions.map((q, i) =>
                            i === index ? value : q
                        ),
                    })),
            }),
            { name: "input-storage" }
        )
    )
);
