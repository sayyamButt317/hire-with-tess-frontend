import { useState, useRef } from 'react';

interface UseVoiceRecorderResult {
    isRecording: boolean;
    recordedVoiceURL: string | null;
    seconds: number;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    resetRecording: () => void;
    error: Error | null;
}

const useVoiceRecorder = (): UseVoiceRecorderResult => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVoiceURL, setRecordedVoiceURL] = useState<string | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState<Error | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        setIsRecording(true);
        setSeconds(0);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    recordedChunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(recordedBlob);
                setRecordedVoiceURL(url);
                recordedChunksRef.current = [];
            };

             mediaRecorderRef.current.onerror = (event) => {
                console.error("MediaRecorder error:", event.error);
                setIsRecording(false);
                setError(new Error("MediaRecorder error"));
            };

            mediaRecorderRef.current.start();
        } catch (error) {
            console.error("Error starting voice recording:", error);
            setIsRecording(false);
          
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current) {
            try {
                mediaRecorderRef.current.stop();
                mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
            } catch (error) {
                console.error("Error stopping media recorder:", error);
                
            }
        }
    };

     const resetRecording = () => {
        stopRecording();
        if (recordedVoiceURL) {
            URL.revokeObjectURL(recordedVoiceURL);
        }
        setRecordedVoiceURL(null);
        setSeconds(0);
        setError(null);
    };

    return {
        isRecording,
        recordedVoiceURL,
        seconds,
        startRecording,
        stopRecording,
        resetRecording,
        error
    };
};

export default useVoiceRecorder;