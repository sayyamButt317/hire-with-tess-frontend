import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ToggleProps {
    showPassword: boolean;
    showConfirmPassword: boolean;
    toggleShowPassword: () => void;
    toggleShowConfirmPassword: () => void;
}

export const useToggleStore = create<ToggleProps>()(
    devtools(
        persist(
            (set) => ({
                showPassword: false,
                showConfirmPassword: false,
                toggleShowPassword: () =>
                    set((state) => ({ showPassword: !state.showPassword })),
                toggleShowConfirmPassword: () =>
                    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
            }),
            {
                name: "toggle-password-store",
            }
        )
    )
);
