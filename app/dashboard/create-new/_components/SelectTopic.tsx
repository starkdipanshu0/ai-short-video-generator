"use client";
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function SelectTopic({onUserSelect}) {
  const options = ['Custom Prompt','Random Ai Story', 'Scary Story', 'Funny Story']
  const [selectedOption, setSelectedOption] = React.useState('')
  
  return (
    <div>
      <h2 className='text-xl font-bold p-3 text-primary'>Content</h2>
      <p className='text-gray-500'>What is topic of your video?</p>
      <Select onValueChange={(value)=>{setSelectedOption(value)
        value!='Custom Prompt'&&onUserSelect('topic', value);
      }} > 
        <SelectTrigger className="w-full p-6 mt-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-primary">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => ( 
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
          
          
        </SelectContent>
        
      </Select>
      {
        selectedOption=='Custom Prompt'&&<input type='text' onChange={(e)=>onUserSelect('topic',e.target.value)} placeholder='Enter your prompt' className='w-full p-6 mt-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-primary'/>
      
      } 
      

    </div>
  )
}

export default SelectTopic