"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from '../_components/CustomLoading';
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
    },
    {
      "contentText": "This video will guide you through the basics of artificial intelligence and its applications.",
      "imagePrompt": "A robot sitting at a desk, analyzing data on a screen"
    },
    {
      "contentText": "AI is transforming industries, from healthcare to transportation.",
      "imagePrompt": "A doctor using AI-powered tools to analyze patient data"
    },
    {
      "contentText": "Stay tuned as we explore how you can use AI to simplify your everyday tasks.",
      "imagePrompt": "A person using a smart home device to control appliances"
    },
    {
      "contentText": "Thank you for watching! Don’t forget to like, share, and subscribe for more amazing content.",
      "imagePrompt": "A vibrant thank-you screen with confetti and social media icons"
    }
  ]
  const onCreateClickHandler = async ()=>{
   // getVideoScript();
   generateAudioFile(scriptDATA)
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
    generateAudioFile(scriptData);

  
  }).catch(e=>console.log("error:",e));  
  
  setLoading(false);
}

const generateAudioFile = async (videoScript:any)=>{
  let script = ''
  let id =  uuidv4();
  videoScript.forEach((item:any)=>{
    script=script+item.contentText+' '
  })
  console.log('script is:::',script)
  axios.post('/api/generate-audio',
    {
      text:script,
      id:id
    }
  ).then(res=>{
    console.log(res.data)
  })
}




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