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

const startScreenSharing = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      return displayStream;
    } catch (err) {
      console.error("Error accessing display media:", err);
      return null;
    }
  };

  export default startScreenSharing();