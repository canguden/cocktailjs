"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zustandSetup = void 0;
exports.zustandSetup = {
    files: {
        'src/lib/store.ts': `
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
    }
  )
);
`
    },
    envVars: {},
    dependencies: {
        additional: ['zustand']
    },
    postInstall: []
};