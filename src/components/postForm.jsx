import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";
import Select from "./select.jsx";
import RTE from "./RTE.jsx";
import { service } from "../appWrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const ref = useRef(null);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadfile(data.image[0]) : null;
            if (file) service.deletefile(post.image);
            const dbPost = await service.updatePost(post.$id, { ...data, image: file ? file.$id : undefined });
            alert('update done')
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
        else {
            const file = await service.uploadfile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });
                console.log(dbPost)
                if (dbPost)
                    navigate(`/post/${dbPost.$id}`);
            }
            alert('Post uploaded')
        }
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

    return (
        <form onSubmit={handleSubmit(submit)} className="flex p-3 md:flex-wrap 
        rounded bg-amber-100 sm:my-20 my-30 mx-auto flex-col md:w-2/3">

            <div className="flex flex-col justify-evenly sm:flex-row">
                <div className="sm:w-1/3">
                    <Input label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        ref={ref}
                        {...register("title", { required: true })}
                    />
                    <Input label="Slug :"
                        placeholder="Slug.."
                        ref={ref}
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>

                <div className="w-full  px-2 sm:flex-col sm:w-1/3 flex-row flex justify-evenly">

                    <Input label="Blog Image :"
                        type="file"
                        ref={ref}
                        className="mb-4 mr-2"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.image)}
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

            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            <button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="
            bg-blue-600 mt-2 p-2 w-1/2 rounded-xl self-center sm:w-1/3">
                {post ? "Update" : "Submit" }
            </button>

        </form>
    );
}