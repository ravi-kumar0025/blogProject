import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";
import Select from "./select.jsx";
import RTE from "./RTE.jsx";
import { service } from "../appWrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DRAFT_KEY = "blog_draft";

export default function PostForm({ post }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const ref = useRef(null);

    const { register, handleSubmit, watch, setValue, control, getValues, reset} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft && !post) {
            const draft = JSON.parse(savedDraft);
            if (draft.title) setValue("title", draft.title);
            if(draft.slug) setValue("slug",draft.slug);
            if (draft.content) setValue("content", draft.content);
            if (draft.status) setValue("status", draft.status);
        }
    }, [setValue, post]);

    const submit = async (data) => {
        console.log("check here :",userData);
        // if (post) {
        //     const file = data.image[0] ? await service.uploadfile(data.image[0]) : null;
        //     if (file) service.deletefile(post.image);

        //     const dbPost = await service.updatePost(post.$id, {
        //         ...data,
        //         image: file ? file.$id : undefined,
        //     });
        //     alert("update done");
        //     if (dbPost) {
        //         localStorage.removeItem(DRAFT_KEY);
        //         navigate(`/post/${dbPost.$id}`);
        //     }
        // } else {
        //     const file = await service.uploadfile(data.image[0]);
        //     console.log("CHECK HERE: ",file)
        //     console.log(data)
        //     if (file) {
        //         const fileId = file.$id;
        //         data.image = fileId;
        //         const dbPost = await service.createPost({
        //             ...data,
        //             userId: userData.$id,
        //         });

        //         if (dbPost) {
        //             localStorage.removeItem(DRAFT_KEY);
        //             navigate(`/post/${dbPost.$id}`);
        //         }
        //     }
        //     // alert("Post uploaded");
        // }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const subscription = watch((value) => {
            const draft = {
                title: value.title,
                slug:value.slug,
                content: value.content,
                status: value.status,
            };
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex p-3 md:flex-wrap 
        rounded bg-amber-100 sm:my-20 my-30 mx-auto flex-col md:w-2/3"
        >
            <div className="flex flex-col justify-evenly sm:flex-row">
                <div className="sm:w-1/3">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        ref={ref}
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug.."
                        ref={ref}
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), {
                                shouldValidate: true,
                            });
                        }}
                    />
                </div>

                <div className="w-full px-2 sm:flex-col sm:w-1/3 flex-row flex justify-evenly">
                    <Input
                        label="Blog Image :"
                        type="file"
                        ref={ref}
                        className="mb-4 mr-2"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.previewfile(post.image)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        ref={ref}
                        className="mb-4 ml-2"
                        {...register("status", { required: true })}
                    />
                </div>
            </div>

            <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />

            <button
                type="submit"
                bgcolor={post ? "bg-green-500" : undefined}
                className="bg-blue-600 mt-2 p-2 w-1/2 rounded-xl self-center sm:w-1/3"
            >
                {post ? "Update" : "Submit"}
            </button>
        </form>
    );
}