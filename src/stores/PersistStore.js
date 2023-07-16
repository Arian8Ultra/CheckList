import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePersistStore = create(
  persist(
    (set,get) => ({
      firstName: "",
      lastName: "",
      token: "",
      role: "",
      id: "",
      isvalid: false,
      setUser: (
        /** @type {string} */ firstName,
        /** @type {string} */ lastName,
        /** @type {string} */ token,
        /** @type {string} */ role,
        /** @type {string} */ id,
      ) => {
        set({ firstName, lastName, token, role, id, isvalid: true });
        sessionStorage.setItem("token", token);
      },
      changeValid: () => set({ isvalid: !get().isvalid }),
      logout: () =>
        set({
          firstName: "",
          lastName: "",
          token: "",
          role: "",
          id: "",
          isvalid: false,
        }),
    }),
    {
      name: "persist-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
