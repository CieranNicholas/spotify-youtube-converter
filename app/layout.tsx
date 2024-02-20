import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Nav from "@/components/Nav/Nav";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

// const font = Inter({ subsets: ["latin"] });
const font = Inter({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tunebridge",
  description: "Effortlessly convert Spotify Playlists to YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <AuthProvider>
          <Nav />
          <Toaster position='bottom-left' />
          <GoogleOAuthProvider
            clientId={process.env.GOOGLE_CLIENT_ID as string}
          >
            {children}
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
