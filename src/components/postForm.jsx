import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Input from "./Input.jsx";
import Select from "./select.jsx";
import RTE from "./RTE.jsx";
import { service } from "../appWrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DRAFT_KEY = "blog_draft";

export default function PostForm({ post }) {
    const ref = useRef(null);
    const [rawTitle, setRawTitle] = useState(post?.title || "");
    const existingImageId = typeof (post?.image || post?.file) === "string" ? (post?.image || post?.file) : post?.image?.$id;

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const watchedValues = useWatch({ control });

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
    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData);

    const resetForm = () => {
        reset({
            title: "",
            slug: "",
            content: "",
            status: "active",
            image: null,
        });
        setRawTitle("");
        localStorage.removeItem(DRAFT_KEY);
    };

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadfile(data.image[0]) : null;
            if (file && existingImageId) service.deletefile(existingImageId);

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : existingImageId,
            });
            alert("update done");
            if (dbPost) {
                localStorage.removeItem(DRAFT_KEY);
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadfile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    resetForm();
                    localStorage.removeItem(DRAFT_KEY);
                    navigate(`/post/${dbPost.$id}`);
                }
            }
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
        if (rawTitle) {
            setValue("slug", slugTransform(rawTitle), { shouldValidate: true });
        } else {
            setValue("slug", "", { shouldValidate: true });
        }
    }, [rawTitle, slugTransform, setValue]);

    useEffect(() => {
        if (post) return;
        if (!watchedValues) return;
        const draft = {
            title: watchedValues.title || "",
            slug: watchedValues.slug || "",
            content: watchedValues.content || "",
            status: watchedValues.status || "active",
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, [watchedValues, post]);

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
                        onInput={(e) => {
                            setRawTitle(e.currentTarget.value);
                        }}
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
                                src={existingImageId ? service.previewfile(existingImageId) : ""}
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

            <div className="mt-2 flex w-full justify-center gap-3">
                <button
                    type="submit"
                    bgcolor={post ? "bg-green-500" : undefined}
                    className="w-1/3 rounded-xl bg-blue-600 p-2 text-white"
                >
                    {post ? "Update" : "Submit"}
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="w-1/3 rounded-xl bg-slate-600 p-2 text-white hover:bg-slate-500"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
