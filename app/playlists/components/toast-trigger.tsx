"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ToastTriggerProps {
  shouldTrigger: boolean;
}

const ToastTrigger: React.FC<ToastTriggerProps> = ({ shouldTrigger }) => {
  useEffect(() => {
    if (shouldTrigger) {
      toast.error(
        "Please connect your Spotify and Youtube accounts to continue."
      );
      redirect("/auth");
    }
  }, [shouldTrigger]);
  return <></>;
};

export default ToastTrigger;
