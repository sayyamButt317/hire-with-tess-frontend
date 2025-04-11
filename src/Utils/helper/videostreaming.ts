import { toast } from "sonner";

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
      return userStream;
    } catch (err) {
      console.log(err)
      toast("Error in Starting stream:")
      return null;
    }

  }

  export default startVideoStreaming();