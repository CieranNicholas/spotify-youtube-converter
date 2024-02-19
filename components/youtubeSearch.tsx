import { getYoutubeDataByKeyword } from "@/actions/getYoutubeDataByKeyword";

const YoutubeSearch = async () => {
  const data = await getYoutubeDataByKeyword("american idiot");

  return (
    <div className='flex flex-col'>
      <p>{data.channelTitle}</p>
      <p>{data.title}</p>
      <p>{data.id}</p>
      <img
        src={data.thumbnail.thumbnails[1].url}
        className='object-cover w-40'
      />
    </div>
  );
};

export default YoutubeSearch;
