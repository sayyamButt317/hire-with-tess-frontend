'use client';

import React, { useRef, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { TextField, Box } from '@mui/material';
import EnhancedSpeechButton from "@/app/interview/component/SpeechButton";
import { Button } from '@/components/ui/button'
import { CirclePause, CirclePlay, } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
interface SpeechRecordingInputProps {
    placeholder?: string;
    onSaveAndContinue: (transcript: string, audioURL: string | null) => void;
}

const formatTime = (timeInSeconds: number): string => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
    placeholder = "Your response will appear here as you speak...",
    onSaveAndContinue
}) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [hasRecorded, setHasRecorded] = useState<boolean>(false);
    const [audioData, setAudioData] = useState<number[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;

        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            setAudioData([])
            setHasRecorded(false)
        
        };
    }, []);

    // Update the input field when transcript changes
    useEffect(() => {
        if (inputRef.current && transcript) {
            inputRef.current.value = transcript;
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);
        }
    }, [transcript]);

    // Update canvas whenever audioData or isPlaying changes
    useEffect(() => {
        if (canvasRef.current && audioData.length > 0) {
            const canvas = canvasRef.current;
            const canvasCtx = canvas.getContext('2d');
            if (!canvasCtx) return;

            const width = canvas.width;
            const height = canvas.height;

            // Clear the canvas
            canvasCtx.clearRect(0, 0, width, height);
            canvasCtx.fillStyle = '#f8f9fa';
            canvasCtx.fillRect(0, 0, width, height);

            // Calculate bar width and gap
            const barWidth = 2;
            const gap = 1;
            // Draw waveform
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, height / 2);

            const totalBars = Math.floor(width / (barWidth + gap));
            const step = Math.max(1, Math.floor(audioData.length / totalBars));

            for (let i = 0; i < totalBars; i++) {
                const dataIndex = Math.min(i * step, audioData.length - 1);
                const value = audioData[dataIndex] / 255.0;
                const x = i * (barWidth + gap);
                const barHeight = Math.max(2, value * height * 0.8);
                const y = (height - barHeight) / 2;
                canvasCtx.fillStyle = isPlaying ? '#0048b3' : '#3b82f6';
                canvasCtx.fillRect(x, y, barWidth, barHeight);
            }
        }
    }, [audioData, isPlaying]);

    // Generate realistic waveform data
    const generateWaveformData = (): number[] => {
        const sampleCount = 100;
        let lastValue = 128;
        return Array.from({ length: sampleCount }, () => {
            const randomChange = Math.random() * 60 - 30;
            lastValue = Math.max(40, Math.min(215, lastValue + randomChange));
            return lastValue;
        });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                // Generate visualization data that looks like a waveform
                setAudioData(generateWaveformData());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

            // Start speech recognition
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
            setIsListening(true);
            visualize();
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            setHasRecorded(true);
        }
        if (isListening) {
            SpeechRecognition.stopListening();
            setIsListening(false);
        }
    };

    // Toggle play/pause audio
    const togglePlayback = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlaybackEnded = () => {
        setIsPlaying(false);
    };

    const handleRecordAgain = () => {
        resetTranscript();
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setAudioURL(null);
        setIsPlaying(false);
        setHasRecorded(false);
        setAudioData([]);
    };

    // Live frequency visualization during recording
    const visualize = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioData(Array.from(dataArray));
        if (isRecording) {
            animationFrameRef.current = requestAnimationFrame(visualize);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleSaveAndContinue = () => {
        if (onSaveAndContinue && inputRef.current) {
            onSaveAndContinue(inputRef.current.value, audioURL);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className='w-full'>
                <div >
                    <Skeleton className="w-full h-10 mb-4" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className=' flex flex-col mt-8 items-center justify-center'>

                    <Skeleton className="w-20 h-20 rounded-full z-10 relative" />
                </div>

            </div>
        )
    }

    return (
        <div className="relative w-full">
            <TextField
                inputRef={inputRef}
                multiline
                rows={6}
                variant="outlined"
                placeholder={placeholder}
                fullWidth
                className="w-full rounded-2xl"
            />

            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={audioURL || undefined}
                onEnded={handlePlaybackEnded}
                className="hidden"
            />

            {(hasRecorded || isRecording) && (
                <Box className="mt-4 bg-white rounded-full p-3 border border-gray-200">
                    <div className="flex flex-row items-center justify-between mb-2">
                        <div className="flex items-center justify-center">

                            <canvas
                                ref={canvasRef}
                                width={600}
                                height={48}
                                className="truncate overflow-hidden text-ellipsis w-full h-12 border-dashed color-[#1E4B8E]"
                            />

                        </div>

                        <div className='flex flex-row gap-2'>
                            <div className="text-sm text-gray-600 ">
                                {isRecording
                                    ? 'Recording...'
                                    : `Recording (${audioRef.current ? formatTime(audioRef.current.duration || 0) : '00:00'})`}
                            </div>
                            {hasRecorded && !isRecording && (
                                <div
                                    onClick={togglePlayback}
                                    className=" bg-transparent rounded-full"
                                >
                                    {isPlaying ? (
                                        <CirclePause color="#1E4B8E" />
                                    ) : (
                                        <CirclePlay color="#1E4B8E" />
                                    )}
                                </div>
                            )}
                        </div>

                    </div>


                </Box>
            )}

            <div className="flex justify-center mt-12">
                {!hasRecorded ? (
                    <EnhancedSpeechButton
                        isListening={isRecording}
                        onClick={toggleRecording}
                    />
                ) : (
                    <div className="flex space-x-4 w-full justify-center font-openSans">
                        <Button

                            variant="outline"
                            onClick={handleRecordAgain}
                            className="px-6 border-[#F7941D] text-[#F7941D]"
                        >
                            Record Again
                        </Button>

                        <Button

                            onClick={handleSaveAndContinue}

                        >
                            Save and Continue
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeechRecordingInput;
