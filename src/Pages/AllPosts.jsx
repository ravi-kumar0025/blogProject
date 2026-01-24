import React, {useState, useEffect} from 'react'
import Box from '../components/Box'
import service from '../appWrite/database.jsx';
import Card from '../components/Card.jsx';
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Box>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Card {...post} />
                    </div>
                ))}
            </div>
            </Box>
    </div>
  )
}

export default AllPosts