import React from "react";
import { Mic } from "lucide-react";

interface EnhancedSpeechButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const EnhancedSpeechButton: React.FC<EnhancedSpeechButtonProps> = ({
  isListening,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-sm text-gray-500">
        {isListening ? "Listening..." : "Tap to speak"}
      </div>
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none transition-all duration-300 
        "
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            isListening ? "bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] shadow-2xl" : "bg-gray-200 hover:bg-gray-300"
          } transition-all duration-300 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] `}
        />
        <Mic
          className="w-8 h-8 z-10 relative text-white"/>
        {isListening && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full animate-pulse opacity-70 " />
            <div className="absolute w-20 h-20 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D]  rounded-full opacity-20 animate-ping animation-delay-300 shadow-lg" />
          </>
        )}
      </button>
    </div>
  );
};

export default EnhancedSpeechButton;
