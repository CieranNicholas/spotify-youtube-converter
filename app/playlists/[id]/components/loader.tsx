"use client";

import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <ClipLoader
      loading={true}
      color={color ? color : "#fffff"}
      size={size ? size : 25}
    />
  );
};

export default Loader;
