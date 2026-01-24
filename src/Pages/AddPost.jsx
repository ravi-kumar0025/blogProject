import React from 'react'
import PostForm from '../components/postForm'
import Box from '../components/box';

function AddPost() {
    return (
        <div className='py-8'>
            <Box>
                <PostForm />
            </Box>
        </div>
    )
}

export default AddPost