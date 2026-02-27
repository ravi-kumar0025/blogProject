import React, { useEffect, useState } from 'react'
import PostForm from '../components/postForm'
import Container from '../components/box'
import {service} from "../appWrite/database"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdminUser } from '../utils/admin';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!userData) return;
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    const canEdit = post.userId === userData?.$id || isAdminUser(userData);
                    if (canEdit) {
                        setPosts(post)
                    } else {
                        navigate(`/post/${slug}`)
                    }
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate, userData])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
