import Image from "next/image";
import { Check, Pencil, X } from "lucide-react";
import { useSkillStore } from "@/store/InputStore";
import useUpdateJobQuestion from "@/hooks/UpdateJobQuestion.hook";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface QuestionProps {
    questions: string[];
    showImage?: boolean;
}

export default function Question({ questions, showImage = true }: QuestionProps) {
    const { editableQuestionIndex, setEditableQuestionIndex, isEditable, setIsEditable } = useSkillStore();
    const [editedQuestions, setEditedQuestions] = useState([...questions]);
    const UpdateQuestionMutation = useUpdateJobQuestion();

    const SaveUpdatedQuestions = async () => {
        if (editedQuestions !== questions) {
            UpdateQuestionMutation.mutate({ questions: editedQuestions });
        }
        setEditableQuestionIndex(null);
        setIsEditable(false);
    };

    const EnableEditing = (index: number) => {
        setEditableQuestionIndex(index);
        setIsEditable(true);
    };

    const cancelEditing = () => {
        setIsEditable(false);
        setEditableQuestionIndex(null);
        setEditedQuestions([...questions]);
    };

    return (
        <div className="text-left space-y-2 w-full">
            <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
            <ul className="space-y-4 w-full">
                {editedQuestions.map((question, index) => (
                    <div key={index} className="flex items-center gap-4 w-full">
                        {showImage && (
                            <Image src="/images/AIAvatar.png" alt="bot" width={40} height={40} />
                        )}
                        <div className="relative w-full">
                            {editableQuestionIndex === index ? (
                                <Textarea
                                    value={question}
                                    onChange={(e) => {
                                        const newQuestions = [...editedQuestions];
                                        newQuestions[index] = e.target.value;
                                        setEditedQuestions(newQuestions);
                                    }}
                                    className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2"
                                    autoFocus
                                />
                            ) : (
                                <p className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2 flex items-center">
                                    {question}
                                </p>
                            )}

                            {editableQuestionIndex === index ? (
                                editedQuestions[index] !== questions[index] ? (
                                    <Check
                                        size={18}
                                        color="green"
                                        style={{ cursor: "pointer" }}
                                        onClick={SaveUpdatedQuestions}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    />
                                ) : (
                                    <X
                                        size={18}
                                        color="orange"
                                        style={{ cursor: "pointer" }}
                                        onClick={cancelEditing}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    />
                                )
                            ) : (
                                <Pencil
                                    size={18}
                                    color="#718096"
                                    onClick={() => EnableEditing(index)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
