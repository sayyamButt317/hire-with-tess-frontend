'use client';
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/ui/button';
import { CirclePause, CirclePlay, Mic, MonitorUp, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';
import WaveSurfer from 'wavesurfer.js';
import RecordingControls from '@/app/interview/component/RecordingControls';

interface SpeechRecordingInputProps {
  placeholder?: string;
  onSaveAndContinue: (transcript: string, audioURL: string | null) => void;
}

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
  placeholder = 'Your response will appear here as you speak...',
  onSaveAndContinue,
}) => {
  const { isPlaying, hasRecorded, setIsPlaying } = useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordedVoiceURL, setIsRecordedVoiceURL] = useState('');
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);

  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTool, setActiveTool] = useState<'mic' | 'video' | 'screen' | null>(null);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const userCameraRef = useRef<HTMLVideoElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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
    await SpeechRecognition.startListening({ continuous: true });
  };
  const stopSpeechRecognition = async () => {
    await SpeechRecognition.stopListening();
  };

  const startVoiceRecording = async () => {
    setIsVoiceRecording(true);
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(recordedBlob);
        setIsRecordedVoiceURL(url);

        recordedChunksRef.current = [];
        clearTimeout(timer);
      };
      mediaRecorderRef.current.start();
    } catch (error) {
      console.log(error);
    }
  };
  const stopVoiceRecording = () => {
    setIsVoiceRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleSpeechRecognition = async () => {
    if (listening) {
      stopVoiceRecording();
      await stopSpeechRecognition();
      setActiveTool(null);
    } else {
      await startSpeechRecognition();
      startVoiceRecording();
      setActiveTool('mic');
    }
  };
  const togglePlayback = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    if (ws.isPlaying()) {
      ws.pause();
      setIsPlaying(false);
    } else {
      ws.play();
      setIsPlaying(true);
    }
  };

  const handleRestartScreenSharing = async () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
      previewVideoRef.current.src = '';
    }

    setRecordedBlobUrl('');
    setIsRecordingStream(false);
    setActiveTool('screen');

    await startScreenRecording();
  };

  const startUserCamera = async (): Promise<MediaStream | null> => {
    try {
      console.log('Starting user camera...');
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

  const startVideoRecording = async () => {
    if (!mediaStreamRef.current) {
      toast.error('Camera is not started');
      return;
    }

    recordedChunksRef.current = [];

    try {
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
        mimeType: 'video/webm; codecs=vp9',
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });
        const videoURL = URL.createObjectURL(videoBlob);
        setRecordedVideoURL(videoURL);
        console.log('Recording complete. Video URL:', videoURL);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting video recording:', error);
    }
  };
  const stopVideoRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log('Recording stopped...');
    } else {
      console.log('No recording in progress');
    }
  };

  const toggleUserCamera = async () => {
    if (isRecordingStream) {
      stopVideoRecording();
      stopUserCamera();
      setActiveTool(null);
    } else {
      setActiveTool('video');
      await startUserCamera();
      startVideoRecording();
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

  const startScreenRecording = async () => {
    const screenStream = await startScreenShare();

    if (!screenStream) {
      resetAllState()
      toast.error('Failed to start screen or camera');
      return;
    }
    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = screenStream;
    }

    recordedChunksRef.current = [];
    setupMediaRecorder(screenStream);
    setIsRecordingStream(true);
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

  useEffect(() => {
    if (!recordedVoiceURL) return;

    const waveformElement = document.getElementById('waveform');
    if (!waveformElement) return;
    waveformElement.innerHTML = '';
    const wavesurfer = WaveSurfer.create({
      container: waveformElement,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      cursorWidth: 1,
      backend: 'WebAudio',
      height: 40,
      waveColor: '#1e4b8e',
      progressColor: '#C4C4C4',
      cursorColor: 'transparent',
      url: recordedVoiceURL,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on('finish', () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
      wavesurferRef.current = null;
    };
  }, [recordedVoiceURL, setIsPlaying]);

  const handleSaveAndContinue = () => {
    console.log('pressed button');
    if (onSaveAndContinue) {
      onSaveAndContinue(transcript, recordedVoiceURL);
    }
  };

  const resetAllState = () => {
    if (listening) {
      stopSpeechRecognition();
    }
    stopVoiceRecording();
    stopVideoRecording();
    stopUserCamera();

    setIsRecordedVoiceURL('');
    setRecordedVideoURL(null);
    setRecordedBlobUrl(null);

    setSeconds(0);
    setIsPlaying(false);
    setIsVoiceRecording(false);
    setIsRecordingStream(false);
    setActiveTool(null);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = null;
      previewVideoRef.current.src = '';
    }

    if (userCameraRef.current) {
      userCameraRef.current.srcObject = null;
    }

    recordedChunksRef.current = [];
    resetTranscript();
  };

  const handleRestartRecording = async () => {
    resetAllState();
  };

  const getRecordAgainLabel = () => {
    if (recordedBlobUrl) return 'Share Again';
    return 'Record Again';
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
      onClick: handleRestartScreenSharing,
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
    <div className="relative w-full space-y-4">
      {/* Transcript Textarea */}
      <Textarea
        rows={6}
        value={transcript}
        placeholder={placeholder}
        className="w-full rounded-2xl"
        readOnly
      />

      {/* Media Player Section - Audio, Video, or Screen Recording */}
      {(recordedVoiceURL || recordedVideoURL || recordedBlobUrl) && (
        <div className="space-y-4">
          {/* Audio Player */}
          {recordedVoiceURL && (
            <div className="rounded-full p-3 border shadow-xl">
              <div className="flex items-center gap-2 w-full">
                <div id="waveform" className="flex-1" />
                <span className="text-[#1e4b8e] min-w-[50px] text-center">
                  {formatTime(seconds)}
                </span>
                <button onClick={togglePlayback} className="p-1">
                  {isPlaying ? (
                    <CirclePause className="w-10 h-8" color="#1e4b8e" />
                  ) : (
                    <CirclePlay className="w-10 h-8" color="#1e4b8e" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Video Player */}
          {recordedVideoURL && (
            <video src={recordedVideoURL} controls className="w-full h-auto rounded-xl" />
          )}

          {/* Screen Recording Player */}
          {recordedBlobUrl && (
            <video src={recordedBlobUrl} controls className="w-full h-auto rounded-xl" />
          )}

          {/* Common Recording Controls */}
          <RecordingControls
            onRecordAgain={handleRestartRecording}
            onSaveAndContinue={handleSaveAndContinue}
            recordAgainLabel={getRecordAgainLabel()}
          />
        </div>
      )}

      {/* Recording Tool Buttons */}
      {!hasRecorded &&
        !recordedVoiceURL &&
        !recordedBlobUrl &&
        !recordedVideoURL &&
        activeTool !== 'screen' && (
          <div className="flex justify-center gap-2 mt-12">
            {activeTool
              ?
                tools
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
              :
                tools.map((tool) => (
                  <EnhancedButton
                    key={tool.key}
                    action={false}
                    onClick={tool.onClick}
                    icon={tool.icon}
                    defaultTitle=""
                    onpressTitle={tool.title}
                  />
                ))}
          </div>
        )}

      {activeTool === 'video' && (
        <div className=" z-10 transition-all duration-300 ease-in-out">
          <div className="relative group">
            <div className="w-70% h-50% rounded-xl overflow-hidden shadow-2xl border-2 bg-transparent">
              <video
                ref={userCameraRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 pointer-events-none" />
              {isRecordingStream && (
                <div className="absolute top-3 left-3 flex items-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <span className="ml-2 text-xs font-medium text-white">REC</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SpeechRecordingInput;
