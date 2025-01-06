"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
interface VideoSegment {
  contentText: string;
  imagePrompt: string;
}


function CreateNew() {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = React.useState({
    topic: '',
    style: '',
    duration: ''
  });

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
    async()=>{
      await generateAudioFile(scriptData);
      await generateImage(scriptData);

    }
    

  
  }).catch(e=>console.log("error:",e));  

  
  setLoading(false);
  
}
  // generate audio file
const generateAudioFile = async (videoScript:any)=>{
  
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
    generateAudioCaption(res.data.result);
  })
  
  
}
  // generate audio caption
const generateAudioCaption = async (audioFileURL:string)=>{
  
  await axios.post('/api/generate-caption',
    {
      audioFileURL:audioFileURL
    }
  ).then(res=>{
    console.log('audio caption:',res.data.words)
    setAudioCaption(res.data.words);
  })
  
  
}

  // generate image
  const generateImage = async (videoScript: VideoSegment[]) => {
    
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
      console.log('Generated images:', validImages);
    } catch (error) {
      console.error('Error generating images:', error);
    }
     
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



    </div>
  )
}

export default CreateNew