import React from 'react'
import SelectTopic from './_components/SelectTopic'

function CreateNew() {
  
  const [formData, setFormData] = React.useState('')
  const handleOnInputChange = (fieldName:Text, fieldVale:Text) => {
     

  }
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-center text-primary text-2xl p-3'>Create New</h2>
        <div className='mt-10 p-10 shadow-md rounded-md'>
            {/* select topic component */}
            <SelectTopic onUserSelect={handleOnInputChange}/>
            {/* select Style */}

            {/* duration */}

            {/* Create Button */}
        </div>



    </div>
  )
}

export default CreateNew