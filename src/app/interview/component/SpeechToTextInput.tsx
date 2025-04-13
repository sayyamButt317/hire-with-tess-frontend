'use client';
import React, { useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box } from '@mui/material';
import { Button } from '@/components/ui/button';
import { CirclePause, CirclePlay, Mic, MonitorUp, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';

interface SpeechRecordingInputProps {
  placeholder?: string;
  onSaveAndContinue: (transcript: string, audioURL: string | null) => void;
}

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
  placeholder = 'Your response will appear here as you speak...',
  onSaveAndContinue,
}) => {
  const { isRecording, audioURL, isPlaying, hasRecorded, setIsPlaying } =
    useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'mic' | 'video' | 'screen' | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const userCameraRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const screenShareOptions = {
    video: {
      displaySurface: 'browser',
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
    preferCurrentTab: false,
    selfBrowserSurface: 'exclude',
    systemAudio: 'include',
    surfaceSwitching: 'include',
    monitorTypeSurfaces: 'include',
  };

  const startSpeechRecognition = async () => {
    await startUserCamera();
    await SpeechRecognition.startListening({ continuous: true });
  };
  const stopSpeechRecognition = async () => {
    stopUserCamera();
    await SpeechRecognition.stopListening();
  };
  const toggleSpeechRecognition = async () => {
    if (listening) {
      await stopSpeechRecognition();
      setActiveTool(null);
    } else {
      await startSpeechRecognition();
      setActiveTool('mic');
    }
  };

  const togglePlayback = () => {
    if (!audioPlaybackRef.current) return;
    if (isPlaying) {
      audioPlaybackRef.current.pause();
    } else {
      audioPlaybackRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleRestartRecording = () => resetTranscript();

  const startUserCamera = async (): Promise<MediaStream | null> => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };

      const userStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (userCameraRef.current) {
        userCameraRef.current.srcObject = userStream;
      }
      mediaStreamRef.current = userStream;
      setIsRecordingStream(true);
      return userStream;
    } catch (error) {
      console.error('Camera access error:', error);
      toast.error('Could not access camera/microphone');
      return null;
    }
  };
  const stopUserCamera = (): void => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }

    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
    }

    if (userCameraRef.current) {
      userCameraRef.current.srcObject = null;
    }

    setIsRecordingStream(false);
  };
  const toggleUserCamera = async () => {
    if (isRecordingStream) {
      stopUserCamera();
      setActiveTool(null);
    } else {
      await startUserCamera();
      setActiveTool('video');
    }
  };

  const startScreenShare = async (): Promise<MediaStream | null> => {
    try {
      return await navigator.mediaDevices.getDisplayMedia(screenShareOptions);
    } catch (error) {
      console.error('Screen share error:', error);
      toast.error('Could not start screen sharing');
      return null;
    }
  };

  const startCombinedRecording = async () => {
    const screenStream = await startScreenShare();
    const cameraStream = await startUserCamera();

    if (!screenStream || !cameraStream) {
      toast.error('Failed to start screen or camera');
      return;
    }

    const combinedStream = new MediaStream([
      ...screenStream.getTracks(),
      ...cameraStream.getTracks(),
    ]);

    mediaStreamRef.current = combinedStream;
    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = combinedStream;
    }

    recordedChunksRef.current = [];
    setupMediaRecorder(combinedStream);
    setIsRecordingStream(true);
  };
  const stopCombinedRecording = async (): Promise<void> => {
    try {
      // Stop the media recorder if it exists and is active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      // Stop all media tracks
      stopUserCamera();
      recordedChunksRef.current = [];
    } catch (error) {
      console.error('Error stopping combined recording:', error);
      toast.error('Failed to stop recording properly');
    }
  };
  const toggleScreenSharing = async () => {
    if (isRecordingStream) {
      await stopCombinedRecording();
      setActiveTool(null);
    } else {
      await startCombinedRecording();
      setActiveTool('screen');
    }
  };

  const setupMediaRecorder = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      setRecordedBlobUrl(URL.createObjectURL(videoBlob));
    };

    recorder.start();
  };

  const handleSaveAndContinue = () => {
    if (onSaveAndContinue && inputRef.current) {
      onSaveAndContinue(inputRef.current.value, audioURL);
    }
  };
  const tools = [
    {
      key: 'mic',
      condition: listening,
      onClick: toggleSpeechRecognition,
      icon: <Mic />,
      title: 'Listening...',
    },
    {
      key: 'video',
      condition: isRecordingStream,
      onClick: toggleUserCamera,
      icon: <Video />,
      title: 'Recording...',
    },
    {
      key: 'screen',
      condition: isRecordingStream,
      onClick: toggleScreenSharing,
      icon: <MonitorUp />,
      title: 'Sharing...',
    },
  ];

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="w-full">
        <div>
          <Skeleton className="w-full h-10 mb-4" />
        </div>
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className=" flex flex-col mt-8 items-center justify-center">
          <Skeleton className="w-20 h-20 rounded-full z-10 relative" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Textarea
        rows={6}
        value={transcript}
        placeholder={placeholder}
        className="w-full rounded-2xl"
        readOnly
      />
      {(hasRecorded || isRecording) && (
        <Box className="mt-4 bg-white rounded-full p-3 border border-gray-200">
          <div className="flex flex-col items-center">
            <canvas
              ref={waveformCanvasRef}
              width={600}
              height={48}
              className="truncate overflow-hidden text-ellipsis w-full h-12 border-dashed color-[#1E4B8E]"
            />
            <div className="mt-3 text-sm text-gray-500">
              {listening ? 'Listening...' : 'Tap to speak'}
            </div>

            <button
              onClick={toggleSpeechRecognition}
              className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none"
              aria-label={listening ? 'Stop listening' : 'Start listening'}
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  listening
                    ? 'bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] shadow-2xl'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              />

              <Mic className="w-8 h-8 z-10 relative text-white" />

              {listening && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full animate-pulse opacity-70" />
                  <div className="absolute w-20 h-20 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full opacity-20 animate-ping animation-delay-300 shadow-lg" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              {isRecording
                ? 'Recording...'
                : `Recorded (${audioPlaybackRef.current ? audioPlaybackRef.current.duration : '00:00'})`}
              {hasRecorded && !isRecording && (
                <div onClick={togglePlayback} className="cursor-pointer">
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

      <div className="flex justify-center mt-12 gap-2">
        {!hasRecorded ? (
          <>
            {activeTool
              ? tools
                  .filter((tool) => tool.key === activeTool)
                  .map((tool) => (
                    <EnhancedButton
                      key={tool.key}
                      action={tool.condition}
                      onClick={tool.onClick}
                      icon={tool.icon}
                      defaultTitle=""
                      onpressTitle={tool.title}
                    />
                  ))
              : tools.map((tool) => (
                  <EnhancedButton
                    key={tool.key}
                    action={false}
                    onClick={tool.onClick}
                    icon={tool.icon}
                    defaultTitle=""
                    onpressTitle={tool.title}
                  />
                ))}
          </>
        ) : (
          <div className="flex space-x-4 justify-center w-full">
            <Button
              variant="outline"
              onClick={handleRestartRecording}
              className="px-6 border-[#F7941D] text-[#F7941D]"
            >
              Record Again
            </Button>
            <Button onClick={handleSaveAndContinue}>Save and Continue</Button>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-6 ">
        {/* User Camera Preview */}
        <div className="flex justify-end w-full ">
          <div className="w-80 h-80 rounded-full border shadow-lg overflow-hidden">
            <video
              ref={userCameraRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      {recordedBlobUrl && (
        <video src={recordedBlobUrl} controls className="w-full h-auto mt-4 rounded-xl" />
      )}
    </div>
  );
};
export default SpeechRecordingInput;
