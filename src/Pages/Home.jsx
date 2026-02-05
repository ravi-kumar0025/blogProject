import React, { useEffect, useState } from 'react'
import { service } from "../appWrite/database.js"
import Container from "../components/box";
import PostCard from "../components/Card";
import * as motion from "motion/react-client"
function Home() {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center my-auto">
                <Container>
                    <div className="flex flex-wrap my-20">
                        <div className="p-2 w-full text-white flex justify-center mx-auto mx-auto">
                            {/*animate={{ rotate: 360 }}
            transition={{ duration: 1 }} */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1, rotate: 360}}
                                transition={{
                                    duration: 2,
                                    scale: { type: "spring", visualDuration: 1, bounce: 0.75 },
                                }}
                                className=' flex justify-center mx-auto'
                            >
                                <img src="https://storage.needpix.com/rsynced_images/blog-1445367_1280.jpg" alt="" className='rounded-full md:w-1/3 w-1/2' />
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home