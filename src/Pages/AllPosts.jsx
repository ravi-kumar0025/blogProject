import React, { useState, useEffect } from 'react'
import { service } from '../appWrite/database.js';
import Card from '../components/Card.jsx';
function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <div className='grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <Card {...post} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPosts
