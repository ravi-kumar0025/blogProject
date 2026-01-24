import React from 'react'
import service from '../appWrite/database.js'
import { Link } from 'react-router-dom'

const Card = ({$id,title,file}) => {
  return (
    <link to={`/post/${$id}`} className='block border border-gray-300 rounded-lg overflow-hidden
    hover:shadow-lg duration-200'>
        <div className='w-full bg-gray-400 rounded-xl p-4'>
            <div>
                <img src={service.previewfile(file)} alt={title} className='object-cover rounded-lg'/>
            </div>
            <div className='mt-2 font-bold text-lg'>
                {title}
            </div>
        </div>
    </link>
  )
}

export default Card
