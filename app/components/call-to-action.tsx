"use client";

import { motion, stagger } from "framer-motion";
import Link from "next/link";
import { PiPlaylistFill } from "react-icons/pi";
import { SlActionRedo } from "react-icons/sl";

const CallToAction = ({ shouldShow }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, bounce: 0.5 }}
    >
      {shouldShow ? (
        <Link
          className='rounded-full bg-white text-black px-8 py-4 flex items-center justify-start gap-2'
          href='/playlists'
        >
          <PiPlaylistFill className='text-neutral-800 text-lg' />
          <p className='text-neutral-800 font-semi-bold text-lg'>Playlists</p>
        </Link>
      ) : (
        <Link
          className='rounded-full bg-white text-black px-8 py-4 flex items-center justify-start gap-2'
          href='/auth'
        >
          <SlActionRedo className='text-neutral-800 text-lg' />
          Get Started
        </Link>
      )}
    </motion.div>
  );
};

export default CallToAction;
