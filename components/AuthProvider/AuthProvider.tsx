"use client";

import { createContext, useContext, useState } from "react";

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface ISpotifySession {
  access_token: string;
  exprires_in: number;
  refresh_token: string;
  scope: string;
  expires: string;
  iat: number;
  exp: number;
}

interface IGoogleSession {
  access_token: string;
  token_type: string;
  exprires_in: number;
  scope: string;
  iat: number;
  exp: number;
}

interface ISession {
  spotify: ISpotifySession;
  google: IGoogleSession;
}

const AuthContext = createContext(undefined);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<ISession>(undefined);
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
