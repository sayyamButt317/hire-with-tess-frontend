"use client";

import React from "react";
import { MonitorUp, Video } from "lucide-react";

interface EnhancedVideoButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const EnhancedVideoButton: React.FC<EnhancedVideoButtonProps> = ({
  isRecording,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-sm text-gray-500">
        {isRecording ? "Recording..." : ""}
      </div>
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none transition-all duration-300"
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            isRecording
              ? "bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] shadow-2xl"
              : " bg-gradient-to-br from-[#1e4b8e] to-[#f7941D]  "
          }`}
        />
        <MonitorUp className="w-8 h-8 z-10 relative text-white" />
        {isRecording && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full animate-pulse opacity-70" />
            <div className="absolute w-20 h-20 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full opacity-20 animate-ping shadow-lg" />
          </>
        )}
      </button>
    </div>
  );
};

export default EnhancedVideoButton;


