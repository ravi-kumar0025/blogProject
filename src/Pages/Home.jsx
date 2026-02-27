import React, { useEffect, useState } from 'react'
import { service } from "../appWrite/database.js"
import Container from "../components/box";
import PostCard from "../components/Card";
import { motion as Motion } from "motion/react"
function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    const isEmpty = posts.length === 0;
    if (posts.length === 0) {
        return (
            <div
                className={`w-full text-center ${isEmpty
                        ? "flex min-h-[55vh] items-center justify-center py-4"
                        : "py-4"
                    }`}
            >
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full text-white flex justify-center mx-auto my-auto">
                            <Motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                transition={{
                                    duration: 2,
                                    scale: { type: "spring", visualDuration: 1, bounce: 0.75 },
                                }}
                                className=' flex justify-center mx-auto'
                            >
                                <p className='font-black text-6xl md:text-9xl'>BLOGS</p>
                            </Motion.div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-4'>
            <Container>
                <div className='grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
