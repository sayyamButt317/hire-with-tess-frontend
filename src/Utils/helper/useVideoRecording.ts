import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";

interface UseVideoRecorderResult {
  isRecordingStream: boolean;
  recordedVideoURL: string | null;
  startCamera: () => Promise<MediaStream | undefined>; 
  stopCamera: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  userCameraRef: React.RefObject<HTMLVideoElement>;
}

const useVideoRecording = (): UseVideoRecorderResult => {

  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const userCameraRef = useRef<HTMLVideoElement | null>(null);
  const isRecordingStream = useRef(false);

  const startCamera = useCallback(async (): Promise<MediaStream | undefined> => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;

      if (userCameraRef.current) {
        userCameraRef.current.srcObject = stream;
      }

      isRecordingStream.current = true;
      return stream;

    } catch (error) {
      console.error("Camera start error:", error);
      toast.error(`Failed to start camera`);
      return undefined; 
    }
  }, [isRecordingStream]);

  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current = null;
    }
    if (userCameraRef.current) {
      userCameraRef.current.srcObject = null;
    }
    isRecordingStream.current = false;
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
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
      };

      mediaRecorderRef.current.start();
    } catch (error: any) {
      console.error('Error starting video recording:', error);
      toast.error(`Failed to start video recording: ${error.message}`);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<void> => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
            mediaRecorderRef.current.stop();
        } catch (error: any) {
            console.error("Error stopping recording:", error);
            toast.error(`Failed to stop video recording: ${error.message}`);
        }
    }
  }, []);

    useEffect(() => {
        return () => {
            if (recordedVideoURL) {
                URL.revokeObjectURL(recordedVideoURL);
            }
        };
    }, [recordedVideoURL]);

  return {
    isRecordingStream,
    recordedVideoURL,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    userCameraRef
  };
};

export default useVideoRecording;