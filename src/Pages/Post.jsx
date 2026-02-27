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
    const imageId = typeof post?.image === "string" ? post.image : post?.image?.$id;

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;
        const status = await service.deletePost(post.$id);
        if (status !== false) {
            if (imageId) {
                await service.deletefile(imageId);
            }
            navigate("/");
        }
    };

    return post ? (
        <div className="mx-auto mb-8 w-full max-w-5xl px-4 py-6 text-white">
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
                <img
                    src={imageId ? service.previewfile(imageId) : ""}
                    alt={post.title}
                    className="h-[260px] w-full object-cover md:h-[420px]"
                />

                {isAuthor && (
                    <div className="absolute right-4 top-4 flex gap-2">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-400">
                                Edit
                            </button>
                        </Link>
                        <button onClick={deletePost} className="rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-400">
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="mb-6 w-full">
                <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
            </div>
            <div className="prose prose-invert max-w-none">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}
