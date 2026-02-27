import React from 'react'
import { Link } from 'react-router-dom'
import { service } from '../appWrite/database'

const Card = ({ $id, title, image, file }) => {
    const imageId = image || file;
    return (
        <Link to={`/post/${$id}`} className='block overflow-hidden rounded-xl border border-white/10 bg-slate-900/60
    transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20'>
            <div className='w-full p-3'>
                <div className='overflow-hidden rounded-lg'>
                    <img src={imageId ? service.previewfile(imageId) : ""} alt={title} className='h-48 w-full object-cover' />
                </div>
                <div className='mt-3 text-lg font-bold text-white'>
                    {title}
                </div>
            </div>
        </Link>
    )
}

export default Card
