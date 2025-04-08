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
        className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none transition-all duration-300"
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            isListening ? "bg-blue-600" : "bg-gray-200 hover:bg-gray-300"
          } transition-all duration-300`}
        />
        <Mic
          className={`w-8 h-8 z-10 relative ${
            isListening ? "text-white" : "text-gray-600"
          }`}
        />
        {isListening && (
          <>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-70" />
            <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-ping animation-delay-300" />
          </>
        )}
      </button>
    </div>
  );
};

export default EnhancedSpeechButton;
