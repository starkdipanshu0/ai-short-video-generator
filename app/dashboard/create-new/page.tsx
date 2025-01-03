"use client"
import React from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';

function CreateNew() {
  
  const [formData, setFormData] = React.useState([]);
  const handleOnInputChange = (fieldName:string, fieldVale:string) => {
    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldVale
    })
    )
    

     

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
            <Button className="bg-primary text-white px-6 py-3 text-lg w-full font-semibold">
                Create Short Video
            </Button>
        </div>



    </div>
  )
}

export default CreateNew