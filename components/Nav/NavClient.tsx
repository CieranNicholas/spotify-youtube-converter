"use client";

import { FaSpotify, FaYoutube } from "react-icons/fa";
import { PiPlaylistFill } from "react-icons/pi";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SlActionRedo } from "react-icons/sl";

interface NavClientProps {
  spotifySession: any;
  googleSession: any;
}

const NavClient: React.FC<NavClientProps> = ({
  spotifySession,
  googleSession,
}) => {
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    setHeader(window.scrollY >= 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <header
      className={
        header
          ? "fixed flex w-full px-4 sm:px-12 md:px-24 py-4 z-10 transition bg-neutral-900/95"
          : "fixed flex w-full px-4 sm:px-12 md:px-24 py-4 z-10 transition"
      }
    >
      <Link href='/' className='relative w-[75px] h-[75px]'>
        <Image src='/navlogosmall.png' alt='playlist image' fill />
      </Link>
      <nav className='flex justify-end items-center w-full gap-2 sm:gap-4'>
        {googleSession && spotifySession && (
          <Link
            href='/playlists'
            className='rounded-full bg-white text-black px-4 py-2 flex items-center justify-start gap-2'
          >
            <PiPlaylistFill className='text-neutral-800' />
            <p className='text-neutral-800'>Playlists</p>
          </Link>
        )}
        {spotifySession ? (
          <div className='bg-spotify px-4 py-2 rounded-full flex items-center justify-start gap-2'>
            <FaSpotify className='text-xl m-0 p-0' />
            <p>✔</p>
          </div>
        ) : (
          <Link
            href='/auth'
            className='rounded-full bg-white text-black px-4 py-2 flex gap-2 items-center justify-start'
          >
            <SlActionRedo className='text-neutral-800 text-lg' />
            Get Started
          </Link>
        )}
        {googleSession && (
          <div className='bg-youtube px-4 py-2 rounded-full flex items-center justify-start gap-2'>
            <FaYoutube className='text-xl m-0 p-0' />
            <p>✔</p>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavClient;
