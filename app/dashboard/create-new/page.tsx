"use client"
import React, { use, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import { VideoData } from '@/configs/schema';
import { db } from '@/configs/db';
import PlayerDialog from '../_components/PlayerDialog';
interface VideoSegment {
  contentText: string;
  imagePrompt: string;
}


function CreateNew() {
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number|null>();
  const [isVideoDataSaved, setIsVideoDataSaved]= useState(false);

  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = React.useState({
    topic: '',
    style: '',
    duration: ''
  });
 // const {videoData, setVideoData} = React.useContext(VideoDataContext);
 const [videoData , setVideoData] = React.useState([]);
  const [videoScript, setVideoScript] = useState<VideoSegment[]>([]);
  const [audioFileURL, setAudioFileURL] = useState<string>('');
  const [audioCaption, setAudioCaption] = useState();
  const [imageList, setImageList] = useState<string[]>([]);
  const handleOnInputChange = (fieldName:string, fieldVale:string) => {
    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldVale

    })
    )
  }

  const scriptDATA=[
    {
      "contentText": "Welcome to the exciting world of AI-generated content!",
      "imagePrompt": "A futuristic city with flying cars and vibrant neon lights"
    }
  ]
  const onCreateClickHandler = async ()=>{
    setIsVideoDataSaved(false);
    getVideoScript();
   //generateAudioFile(scriptDATA)
   // generateImage(scriptDATA);
  }
  

  // get video script
const getVideoScript = async ()=>{
  const prompt = `Write a script to generate a ${formData.duration} video on the topic: ${formData.topic} along with AI image prompts in ${formData.style} format for each screen. Provide the result in JSON format with "imagePrompt" and "contentText" as fields.`
  setLoading(true);
  const result = await axios.post('/api/get-video-script', {
    prompt: prompt
  }).then(res=>{
    console.log(res.data)
    const scriptData: VideoSegment[] = res.data.result.videoSegments;
    setVideoScript(scriptData); 
    setVideoData((prev:any)=>({
      ...prev,
      'videoScript': scriptData
    }))
    
       generateAudioFile(scriptData);
       generateImage(scriptData);

    
    

  
  }).catch(e=>console.log("error:",e));  

  
  
  
}
  // generate audio file
const generateAudioFile = async (videoScript:any)=>{
  setLoading(true);
  let script = ''
  let id =  uuidv4();
  videoScript.forEach((item:any)=>{
    script=script+item.contentText+' '
  })
  console.log('script is:::',script)
  await axios.post('/api/generate-audio',
    {
      text:script,
      id:id
    }
  ).then(res=>{
    console.log('audio file:',res.data.result)
    setAudioFileURL(res.data.result);
    setVideoData((prev:any)=>({
      ...prev,
      'audioFileUrl': res.data.result
    }))
    generateAudioCaption(res.data.result);
  })
  
  
}
  // generate audio caption
const generateAudioCaption = async (audioFileURL:string)=>{
  setLoading(true);
  await axios.post('/api/generate-caption',
    {
      audioFileURL:audioFileURL
    }
  ).then(res=>{
    console.log('audio caption:',res.data.words)
    setAudioCaption(res.data.words);
    setVideoData((prev:any)=>({
      ...prev,
      'captions': res.data.words
    }))
  })
  
  
}

  // generate image
  const generateImage = async (videoScript: VideoSegment[]) => {
    setLoading(true);
    try {
      // Use Promise.all to handle all async requests
      const imagePromises = videoScript.map((item: VideoSegment) => 
        {
         
          
          return axios.post('/api/generate-image', { prompt: item.imagePrompt  })
          .then(res => res.data.result)
          .catch(err => {
            console.error(`Failed to generate image for prompt: ${item.imagePrompt}`, err);
            return null; // Handle error and continue
          })}
      );
  
      // Wait for all the image generation requests to complete
      const images = await Promise.all(imagePromises);
      console.log('images:',images)
  
      // Filter out any null results (in case of errors)
      const validImages = images.filter(img => img !== null);
  
      // Update the image list
      setImageList(validImages);
      setVideoData((prev:any)=>({
        ...prev,
        'imageList': validImages
      }))
      console.log('Generated images:', validImages);
    } catch (error) {
      console.error('Error generating images:', error);
    }
    setLoading(false);
     
  };


  useEffect(() => {
    console.log('videoData:',videoData)

    if(Object.keys(videoData).length==4&&!isVideoDataSaved){
        saveVideoData(videoData);
        setIsVideoDataSaved(true);
        
    }  
  }, [videoData]);


  // const saveVideoData = async ()=>{
  //   setLoading(true);
  //   await axios.post('/api/save-video-data', {
  //     videoData: videoData,
  //     createdBy:user?.primaryEmailAddress?.emailAddress,

  //   }).then(res=>{
  //     console.log('video data saved:::',res.data)
  //   }).catch(e=>console.log('error:',e))
  //   setLoading(false);
  // }

  const saveVideoData = async (videoData:any) => {
    try {
      // @ts-ignore
      const result = await db.insert(VideoData).values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date()
      }).returning({id:VideoData.id})

      setVideoId(result[0].id);
      setPlayVideo(true);
  
      console.log('video data saved:',result)
      
    } catch (error) {
      console.error('Error saving video data:', error);
      
    }

     
    setLoading(false);

  }
  const handleDialogClose = () => {
    setPlayVideo(false);
    setVideoId(null);
     // Reset videoId
  };




  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-center text-primary text-2xl p-3'>Create New</h2>
        <div className='mt-10 p-10 shadow-md rounded-md'>
            {/* select topic component */}
            <SelectTopic onUserSelect={handleOnInputChange}/>
            {/* select Style */}
            <SelectStyle onUserSelect={handleOnInputChange}/>

            {/* duration */}
            <SelectDuration onUserSelect={handleOnInputChange}/>
            {/* Create Button */}
            <Button 
            onClick={onCreateClickHandler}
            className="bg-primary text-white px-6 py-3 text-lg w-full font-semibold">
                Create Short Video
            </Button>
        </div>
        <CustomLoading loading={loading}/>

        <PlayerDialog playVideo={playVideo} videoId={videoId!} onClose={handleDialogClose}/>

    </div>
  )
}

export default CreateNew