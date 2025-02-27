import React, { useEffect, useState } from 'react'
import {Thumbnail} from '@remotion/player';
import RemotionVideo from './RemotionVideo';

import PlayerDialog from './PlayerDialog';
function VideoList({videoList}:any) {
  const [openPlayerDialog, setOpenPlayerDialog]= useState(false);
  const [videoId, setVideoId] = useState<number>();



  const [visibleThumbnails, setVisibleThumbnails] = useState<number>(0);
    const delay = 1000; // 10 seconds per thumbnail

    useEffect(() => {
        if (visibleThumbnails < videoList.length) {
            const timer = setTimeout(() => {
                setVisibleThumbnails((prev:any) => prev + 1);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [visibleThumbnails, videoList.length]);
  const faltu=()=>{} 

  return (
    <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
      {videoList.toReversed().slice(0, visibleThumbnails).map((video:any, index:any)=>(
          <div 
          key={index}
          className='bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105'
            onClick={()=>{
              setOpenPlayerDialog(true);
              setVideoId(video.id)
            }}
          
          >
            <Thumbnail
                component={RemotionVideo}
                compositionWidth={300}
                compositionHeight={450}
                frameToDisplay={30}
                durationInFrames={120}
                fps={30}
                inputProps={{
                  ...video,
                  setDurationInFrames:()=>{}
                }}
            />
          </div>
      ))}
      
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId??0} onClose={faltu}/>

    </div>
  )
}

export default VideoList