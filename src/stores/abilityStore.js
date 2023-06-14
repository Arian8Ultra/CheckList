       // @ts-nocheck
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAbilityStore = create(
    persist(
        (set, get) => ({
            abilities: [''],
            addAbility: (/** @type {any} */ string) => set({ abilities: abilities.push(string) }),
            addAbilityArray: (/** @type {any} */ array) => set({ abilities: array}),
            clearAbilities: () => set({ abilities: [''] }),
        }),
        {
            name: "AbilityStore",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useAbilityStore;