'use client';
import React, { useCallback, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box } from '@mui/material';
import { Button } from '@/components/ui/button'
import { CirclePause, CirclePlay, Mic, MonitorUp, Video, } from 'lucide-react';
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
  placeholder = "Your response will appear here as you speak...",
  onSaveAndContinue
}) => {
  const {

    isRecording,
    audioURL,
    isPlaying,
    hasRecorded,
    setIsPlaying,
  } = useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);



  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleRecordAgain = () => resetTranscript();


  const displayMediaOptions = {
    video: {
      displaySurface: "browser",
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
    preferCurrentTab: false,
    selfBrowserSurface: "exclude",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
  };

  const toggleRecording = async () => {
    if (listening) {
      stopVideoStreaming();
      SpeechRecognition.stopListening();
    } else {
      startVideoStreaming();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const startVideoStreaming = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = userStream;
      }
      streamRef.current = userStream;

      return userStream;
    } catch (err) {
      console.log(err);
      toast("Error in Starting stream:");
      return null;
    }
  };


  const TurnVideo = async () => {
    if (isRecordingStream) {
      await UserVideoTurnOff();
    } else {
      await startVideoStreaming();
    }
  };



  const UserVideoTurnOff = async () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };




  const toggleVideo = async () => {
    if (isRecordingStream) {
      // STOP recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      stopVideoStreaming();
      setIsRecordingStream(false);
    } else {
      // video + screen share +  recording
      const screenStream = await startScreenSharing();
      const userStream = await startVideoStreaming();

      if (userStream && userVideoRef.current) {
        userVideoRef.current.srcObject = userStream;
      }


      if (!screenStream || !userStream) {
        toast("Failed to start screen or camera");
        return;
      }


      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...userStream.getTracks(),
      ]);
      console.log("User Stream Tracks:", userStream.getTracks());
      console.log("Combined Stream Tracks:", combinedStream.getTracks());


      streamRef.current = combinedStream;
      if (videoRef.current) {
        videoRef.current.srcObject = combinedStream;
      }

      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(combinedStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
      };

      mediaRecorder.start();
      setIsRecordingStream(true);
    }
  };
  const startScreenSharing = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      return displayStream;
    } catch (err) {
      console.error("Error accessing display media:", err);
      return null;
    }
  };


  const stopVideoStreaming = useCallback(() => {

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);



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
              ref={canvasRef}
              width={600}
              height={48}
              className="truncate overflow-hidden text-ellipsis w-full h-12 border-dashed color-[#1E4B8E]"
            />
            <div className="mt-3 text-sm text-gray-500">
              {listening ? "Listening..." : "Tap to speak"}
            </div>

            <button
              onClick={toggleRecording}
              className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none"
              aria-label={listening ? "Stop listening" : "Start listening"}
            >

              <div className={`absolute inset-0 rounded-full ${listening ? "bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] shadow-2xl"
                : "bg-gray-200 hover:bg-gray-300"}`} />

              <Mic className="w-8 h-8 z-10 relative text-white" />


              {listening && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full animate-pulse opacity-70" />
                  <div className="absolute w-20 h-20 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full opacity-20 animate-ping animation-delay-300 shadow-lg" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              {isRecording ? 'Recording...' : `Recorded (${audioRef.current ? (audioRef.current.duration) : '00:00'})`}
              {hasRecorded && !isRecording && (
                <div onClick={togglePlayback} className="cursor-pointer">
                  {isPlaying ? <CirclePause color="#1E4B8E" /> : <CirclePlay color="#1E4B8E" />}
                </div>
              )}
            </div>
          </div>
        </Box>
      )}

<div className="flex justify-center mt-12 gap-2">
  {isRecordingStream ? (
    <>
      <EnhancedButton
        action={isRecordingStream}
        onClick={toggleVideo}
        icon={<MonitorUp />}
        defaultTitle={''}
        onpressTitle={'Sharing...'}
      />
      {listening ? (
        <EnhancedButton
          action={listening}
          onClick={toggleRecording}
          icon={<Mic />}
          defaultTitle={''}
          onpressTitle={'Listening...'}
        />
      ) : (
        <>
          <EnhancedButton
            action={isRecordingStream}
            onClick={toggleVideo}
            icon={<MonitorUp />}
            defaultTitle={''}
            onpressTitle={'Sharing...'}
          />
          <EnhancedButton
            onClick={TurnVideo}
            icon={<Video />}
            defaultTitle={''}
            onpressTitle={'Recording...'}
          />
          <EnhancedButton
            action={listening}
            onClick={toggleRecording}
            icon={<Mic />}
            defaultTitle={''}
            onpressTitle={'Listening...'}
          />
        </>
      )}
    </>
  ) : (  <>
    <EnhancedButton
      action={isRecordingStream}
      onClick={toggleVideo}
      icon={<MonitorUp />}
      defaultTitle={''}
      onpressTitle={'Sharing...'}
    />
    <EnhancedButton
      onClick={TurnVideo}
      icon={<Video />}
      defaultTitle={''}
      onpressTitle={'Recording...'}
    />
    <EnhancedButton
      action={listening}
      onClick={toggleRecording}
      icon={<Mic />}
      defaultTitle={''}
      onpressTitle={'Listening...'}
    />
  </>)}
</div>

        {/* {!hasRecorded ? (
          <EnhancedButton
            action={listening}
            onClick={toggleRecording}
            icon={<Mic />}
            defaultTitle={''}
            onpressTitle={'Listening...'}
          />

        ) : (
          <div className="flex space-x-4 justify-center w-full">
            <Button variant="outline" onClick={handleRecordAgain} className="px-6 border-[#F7941D] text-[#F7941D]">
              Record Again
            </Button>
            <Button onClick={handleSaveAndContinue}>Save and Continue</Button>
          </div>
        )}  */}
        
   
      <div className="flex justify-center items-center gap-6 ">
        {/* User Camera Preview */}
        <div className="flex justify-end w-full ">
          <div className="w-80 h-80 rounded-full border shadow-lg overflow-hidden">
            <video
              ref={userVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      {recordedBlobUrl && (
        <video
          src={recordedBlobUrl}
          controls
          className="w-full h-auto mt-4 rounded-xl"
        />
      )}

    </div>
  );
};
export default SpeechRecordingInput;
