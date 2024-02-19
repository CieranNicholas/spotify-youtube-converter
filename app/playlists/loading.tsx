import Loader from "./[id]/components/loader";

const Loading = () => {
  return (
    <div className='grid place-items-center bg-neutral-950 h-full w-full px-4 sm:px-12 md:px-24 py-24'>
      <Loader size={100} color='#1DB954' />
    </div>
  );
};

export default Loading;
