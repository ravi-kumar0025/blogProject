import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { service } from "../appWrite/database";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deletefile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 mt-20 mb-5 mx-auto">
            <div className="w-full md:w-1/2 flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={service.previewfile(post.image.$id)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="mr-3 bg-green-500">
                                Edit
                            </button>
                        </Link>
                        <button  onClick={deletePost} className="bg-red-500 text-white">
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold text-white">{post.title}</h1>
            </div>
            <div className="browser-css text-white">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}