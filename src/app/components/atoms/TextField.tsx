import React from 'react'

interface TextFieldProps {
    label: string;
    description?:string;
    maxlength?: number;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
}

const TextField = ({label,description,maxlength,name,type,required,placeholder}: TextFieldProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700'>
        {label}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          maxLength={maxlength}
          required={required}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </label >
      {description && <p className='text-sm text-gray-500'>{description}</p>}
    </div>
  )
}

export default TextField