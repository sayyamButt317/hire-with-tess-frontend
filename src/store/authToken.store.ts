import { create } from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                accessToken: null,
                setAccessToken: (token) => set({ accessToken: token }),
                clearAccessToken: () => set({ accessToken: null }),
            }),
            {
                name: "auth-storage",
                storage:createJSONStorage (() => localStorage),
            }
        )
    )
);

export default useAuthStore;
