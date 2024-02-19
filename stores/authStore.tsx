import { create } from "zustand";
import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface IGoogleToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ISpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  start_date: Date | null;
}

interface IGoogleAuthStore {
  googleToken: IGoogleToken | null;
  setGoogleToken: (token: IGoogleToken) => void;
  isGoogleTokenValid: boolean;
  setisGoogleTokenValid: (bool: boolean) => void;
}

interface ISpotifyAuthStore {
  spotifyToken: ISpotifyToken | null;
  setSpotifyToken: (token: ISpotifyToken) => void;
}

export const useGoogleAuthStore = create<IGoogleAuthStore>((set) => ({
  googleToken: null,
  setGoogleToken: (token) => set({ googleToken: token }),
  isGoogleTokenValid: false,
  setisGoogleTokenValid: (bool) => set({ isGoogleTokenValid: bool }),
}));

export const useSpotfiyAuthStore = create<ISpotifyAuthStore>((set) => ({
  spotifyToken: null,
  setSpotifyToken: (token) => set({ spotifyToken: token }),
}));
