import React from 'react';

interface EnhancedSpeechButtonProps {
    isListening: boolean;
    onClick: () => void;
}

const EnhancedSpeechButton: React.FC<EnhancedSpeechButtonProps> = ({ isListening, onClick }) => {

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onClick}
                className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none transition-all duration-300"
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
                <div className={`absolute inset-0 rounded-full ${
                    isListening ? 'bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
                } transition-all duration-300`} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-8 h-8 z-10 relative ${isListening ? 'text-white' : 'text-gray-600'}`}
                >
                    <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                {isListening && (
                    <>
                        <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-70" />
                        <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-ping animation-delay-300" />
                    </>
                )}
            </button>
            <div className="mt-2 text-sm text-gray-500">
                {isListening ? 'Listening...' : 'Tap to speak'}
            </div>
        </div>
    );
};

export default EnhancedSpeechButton;
