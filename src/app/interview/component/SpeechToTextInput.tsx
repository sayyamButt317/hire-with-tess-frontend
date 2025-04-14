'use client';
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box } from '@mui/material';
import { Button } from '@/components/ui/button';
import { CirclePause, CirclePlay, Mic, MonitorUp, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/Recording.store';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import EnhancedButton from '@/app/interview/component/SpeechButton';
import WaveSurfer from 'wavesurfer.js'


interface SpeechRecordingInputProps {
  placeholder?: string;
  onSaveAndContinue: (transcript: string, audioURL: string | null) => void;
}

const SpeechRecordingInput: React.FC<SpeechRecordingInputProps> = ({
  placeholder = 'Your response will appear here as you speak...',
  onSaveAndContinue,
}) => {
  const {  isPlaying, hasRecorded, setIsPlaying } =
    useRecordingStore();

  const [isRecordingStream, setIsRecordingStream] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordedVoiceURL, setIsRecoredVoiceURL] = useState('');
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
    setIsVoiceRecording(true)
    try {
      setSeconds(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data)
        }
      }
      const timer = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)

      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' })
        const url = URL.createObjectURL(recordedBlob)
        setIsRecoredVoiceURL(url)

        recordedChunksRef.current = []
        clearTimeout(timer)
      }
      mediaRecorderRef.current.start()

    } catch (error) {
      console.log(error);
    }
  }
  const stopVoiceRecording = () => {
    setIsVoiceRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
    }
  }

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

  const handleRestartRecording = async () => {
    if (listening) {
      await stopSpeechRecognition();
    }
    stopVoiceRecording();

    resetTranscript();
    setIsRecoredVoiceURL('');
    setSeconds(0);
    setIsPlaying(false);
    setActiveTool(null);

    await startSpeechRecognition();
    startVoiceRecording();
    setActiveTool('mic');
  };

  const handleRestartScreenSharing = async () => {

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
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
  const handleRestartVideoStreaming = async () => {
    // Stop previous stream & recording
    stopVideoRecording();
    stopUserCamera();
  
    // Clear previous recorded video
    setRecordedVideoURL(null);
    recordedChunksRef.current = [];
  
    // Restart user camera
    const newStream = await startUserCamera();
    if (newStream) {
      // Start recording again if camera starts successfully
      await startVideoRecording();
      toast.success("Recording restarted");
    } else {
      toast.error("Failed to restart camera");
    }
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
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      console.log('Recording stopped...');
    } else {
      console.log('No recording in progress');
    }
  };

  const toggleUserCamera = async () => {
    if (isRecordingStream) {
      // Stop video recording and camera
      stopVideoRecording();
      stopUserCamera();
      setActiveTool(null);
    } else {
      // Start camera and video recording
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
      toast.error('Failed to start screen or camera');
      return;
    }

    // Clear previous video and setup the new recording
    if (previewVideoRef.current) {
      previewVideoRef.current.srcObject = screenStream;
    }

    recordedChunksRef.current = [];
    setupMediaRecorder(screenStream);
    setIsRecordingStream(true); // Mark that screen sharing is in progress
  };

  // const stopScreenRecording = async (): Promise<void> => {
  //   try {
  //     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
  //       mediaRecorderRef.current.stop();
  //     }
  //   } catch (error) {
  //     console.error('Error stopping combined recording:', error);
      
  //   }
  // };
  // const toggleScreenSharing = async () => {
  //   if (isRecordingStream) {
  //     await stopScreenRecording();
  //     setActiveTool(null);
  //   } else {
  //     await startScreenRecording();
  //     setActiveTool('screen');
  //   }
  // };

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
      backend: "WebAudio",
      height: 40,
      waveColor: '#C4C4C4',
      progressColor: '#1e4b8e',
      cursorColor: "transparent",
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
    console.log("pressed button");
    if (onSaveAndContinue) {
      onSaveAndContinue(transcript, recordedVoiceURL);
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
    <div className="relative w-full">
      <Textarea
        rows={6}
        value={transcript}
        placeholder={placeholder}
        className="w-full rounded-2xl"
        readOnly
      />
      {recordedVoiceURL && (
        <div className="mt-4 rounded-full p-3 border shadow-xl">
          <div className="flex flex-row gap-2 items-center w-full">
            {/* Waveform */}
            <div id="waveform" className="w-full" />

            {/* Timestamp */}
            <span className='text-[#1e4b8e]'>{formatTime(seconds)}</span>

            {/* Play/Pause Button */}
            <div className="flex items-center gap-4">
              <div onClick={togglePlayback}>
                {isPlaying ? (
                  <CirclePause className="w-10 h-8" color='#1e4b8e' />
                ) : (
                  <CirclePlay className="w-10 h-8" color='#1e4b8e' />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* record again and continue Button */}
      <div className='mt-4'>
        {recordedVoiceURL && (
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

      <div className="flex justify-center mt-12 gap-2">
        {!hasRecorded && !recordedVoiceURL && !recordedBlobUrl && !recordedVideoURL ? (
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
        ) : null
        }
      </div>
      {activeTool === 'video' && (
        <div className="flex justify-center items-center  ">
          {/* User Camera Preview */}
          <div className="flex justify-end w-full ">
            <div className="w-80 h-80  border shadow-lg overflow-hidden rounded-2xl">
              <video
                ref={userCameraRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      )}

       {/* user Video Recording Preview */}
       {recordedVideoURL && (
        <div className='items-center justify-center gap-2'>
          <div className="flex space-x-4 justify-center w-full">
            <Button
              variant="outline"
              onClick={handleRestartVideoStreaming}
              className="px-6 border-[#F7941D] text-[#F7941D]"
            >
              Record Video Again
            </Button>
            <Button onClick={handleSaveAndContinue}>Save and Continue</Button>
          </div>
          <video
            src={recordedVideoURL}
            controls
            className="w-full h-auto mt-4 "
          />
        </div>
      )}

      {/* screen sharing recording*/}
      {recordedBlobUrl && (
        <div className='items-center justify-center gap-2'>
          <div className="flex space-x-4 justify-center w-full">
            <Button
              variant="outline"
              onClick={handleRestartScreenSharing}
              className="px-6 border-[#F7941D] text-[#F7941D]"
            >
              Share Again
            </Button>
            <Button onClick={handleSaveAndContinue}>Save and Continue</Button>
          </div>
          <video src={recordedBlobUrl} controls
            className="w-full h-auto mt-4 rounded-xl" />

        </div>
      )}



    </div>
  );
};
export default SpeechRecordingInput;
