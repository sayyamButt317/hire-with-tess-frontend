import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useSkillStore } from "@/store/InputStore";
import useUpdateJobQuestion from "@/hooks/UpdateJobQuestion.hook";
import { useState } from "react";
import { Button } from "@/components/ui/button";


interface QuestionProps {
    questions: string[];
    showImage?: boolean;
}

export default function Question({ questions, showImage = true }: QuestionProps) {
    const { editableQuestionIndex, updateQuestion, setEditableQuestionIndex } = useSkillStore();
    
    const [editedQuestions, setEditedQuestions] = useState([...questions]);

    const UpdateQuestionMutation = useUpdateJobQuestion();

    const handleSaveClick = async () => {
        UpdateQuestionMutation.mutate({ questions: editedQuestions });
        setEditableQuestionIndex(null);
    };

    const handleEditClick = (index: number) => {
        setEditableQuestionIndex(index);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...editedQuestions];
        newQuestions[index] = value;
        setEditedQuestions(newQuestions);
        updateQuestion(index, value);
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
                                <Input
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2"
                                    autoFocus
                                />
                            ) : (
                                <p className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2 flex items-center">
                                    {question}
                                </p>
                            )}

                            <Pencil
                                size={18}
                                color={editableQuestionIndex === index ? "#48BB78" : "#718096"}
                                onClick={() => handleEditClick(index)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            />
                        </div>
                    </div>
                ))}
            </ul>

            {editableQuestionIndex !== null && (
                <div className="flex justify-end mt-4">
                    <Button onClick={handleSaveClick} className="w-40">
                        Save
                    </Button>
                </div>
            )}
        </div>
    );
}
