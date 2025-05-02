import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface ScreenShareOptions {
  video: {
    displaySurface: 'browser';
  };
  audio: {
    echoCancellation: boolean;
    noiseSuppression: boolean;
    sampleRate: number;
    suppressLocalAudioPlayback: boolean;
  };
  preferCurrentTab: boolean;
  selfBrowserSurface: 'include' | 'exclude' | 'auto';
  systemAudio: 'include' | 'exclude' | 'auto';
  surfaceSwitching: 'include' | 'exclude' | 'auto';
  monitorTypeSurfaces: 'include' | 'exclude' | 'auto';
}

const defaultScreenShareOptions: ScreenShareOptions = {
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

const useScreenSharing = (options: Partial<ScreenShareOptions> = {}) => {
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [error] = useState<Error | null>(null);

  const screenShareOptions = {
    ...defaultScreenShareOptions,
    ...options,
  };


    const startScreenShare = async (): Promise<MediaStream | null> => {
      try {
        return await navigator.mediaDevices.getDisplayMedia(screenShareOptions);
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  const startSharing = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(screenShareOptions);
      mediaStreamRef.current = stream;

      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
      }

      recordedChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsSharingScreen(true);
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
        const videoBlob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });
        setRecordedBlobUrl(URL.createObjectURL(videoBlob));
        setIsSharingScreen(false);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      toast.error(`Failed to start screen sharing`);
      setIsSharingScreen(false);
      setIsRecording(false);
    }
  }, [screenShareOptions]);

  const stopSharing = useCallback(() => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (previewVideoRef.current && previewVideoRef.current.srcObject) {
        previewVideoRef.current.srcObject = null;
      }
      setIsSharingScreen(false);
      setIsRecording(false);
      setRecordedBlobUrl(null);
    } catch (error) {
      toast.error(`Failed to stop screen sharing`);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopSharing();
    };
  }, [stopSharing]);

  return {
    isSharingScreen,
    isRecording,
    recordedBlobUrl,
    startSharing,
    stopSharing,
    previewVideoRef,
    startScreenShare,
    error,
  };
};

export default useScreenSharing;
