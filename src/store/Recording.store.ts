// import { number } from 'zod';
// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';



// interface RecordingProps {
//     isListening: boolean;
//     isRecording: boolean;
//     audioURL: string;
//     isPlaying: boolean;
//     hasRecorded: boolean;
//     audioData: number;

//     setIsListening: (value: boolean) => void;
//     setIsRecording: (value: boolean) => void;
//     setAudioURL: (value: string) => void;
//     setIsPlaying: (value: boolean) => void;
//     setHasRecorded: (value: boolean) => void;
//     setAudioData: (value: number) => void;
// }


// export const useRecordingStore = create<RecordingProps>()(
//     devtools(
//         persist(
//             (set) => ({

//                 isListening: false,
//                 isRecording: false,
//                 audioURL: '',
//                 isPlaying: false,
//                 hasRecorded: false,
//                 audioData: number,

//                 setIsListening: (value) => set({ isListening: value }),
//                 setIsRecording:(value) => set({isRecording:value}),
//                 setAudioURL:(value) => set({audioURL:value}),
//                 setIsPlaying:(value) => set({isPlaying:value}),

                

//             })
//         )
//     )
// )