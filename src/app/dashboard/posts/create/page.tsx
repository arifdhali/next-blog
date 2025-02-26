"use client";
import Tiptap from "@/src/app/components/Tiptap";
import { AddBlog } from "@/src/Types";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import * as Yup from "yup"

export default function CreatePost() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    enum Status {
        DRAFT = "draft",
        PUBLISHED = "published",
    }
    const formik = useFormik<AddBlog>({
        initialValues: {
            title: "",
            thumbnail: "",
            content: "",
            status: Status.DRAFT
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            thumbnail: Yup.mixed<File>()
                .required("Thumbnail is required")
                .test("FILE_SIZE", "File is too large", value => {
                    return !value || (value && value.size <= 2 * 1024 * 1024);
                })
                .test("FILE_TYPE", "Only images are allowed", value => {
                    return !value || (value && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
                }),
            content: Yup.string().required("Content is required")
        }),
        onSubmit: async (values, { resetForm }) => {

            let form_data = new FormData();
            Object.entries(values).forEach(([key, data]) => {
                form_data.append(key, data)
            })
            startTransition(async () => {
                await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/dashboard/posts/create`, {
                    method: "POST",
                    body: form_data
                }).then((res) => res.json()).then((data) => {
                    if (data.status) {
                        toast.success(data.message);
                        resetForm();
                        router.push("/dashboard/posts")
                    } else {
                        toast.error(data.message)
                    }
                })
            })
        }
    });
    const handelFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target?.files?.[0];
        formik.setFieldValue("thumbnail", file)
        if (file) {
            let imgURL = URL.createObjectURL(file)
            setPreviewThumbnail(imgURL);
        }
    }
    useEffect(() => {
        return () => {
            if (previewThumbnail) {
                URL.revokeObjectURL(previewThumbnail);
            }
        }
    }, [previewThumbnail])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title-input"
                        className="block mb-2 text-md font-normal text-gray-900"
                    >
                        Title
                    </label>
                    <input
                        name="title"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.title}
                        id="title-input"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus-visible:outline-none  ${formik.errors.title && formik.touched.title ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    {formik.errors.title && formik.touched.title && (
                        <div className="invalid-feedback">
                            <small className="text-red-600">{formik.errors.title}</small>
                        </div>
                    )}
                </div>
                <div className="mb-4 blog-thumbnail h-[400px] overflow-hidden object-center rounded-md">
                    <label htmlFor="blog-thumbnail" className="d-block">Thumbnail</label>
                    {
                        previewThumbnail ? (
                            <img className="rounded-md mt-2" src={previewThumbnail} alt="Preview Images" />
                        ) : (
                            <img className="rounded-md mt-2" src="https://images.unsplash.com/photo-1726607288637-a646ddd3814a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Preview Images" />
                        )
                    }
                </div>
                <div className="mb-6">
                    <div className="flex items-center justify-between w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input id="dropzone-file" name="thumbnail" onChange={handelFileUpload} type="file" className="hidden" />

                        </label>


                    </div>
                    {formik.errors.thumbnail && formik.touched.thumbnail && (
                        <div className="invalid-feedback">
                            <small className="text-red-600">{formik.errors.thumbnail}</small>
                        </div>
                    )}

                </div>

                <div className="mb-6">
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-md font-normal text-gray-900"
                    >
                        Publish status
                    </label>
                    <select
                        name="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 w-full"
                        onChange={formik.handleChange}
                    >
                        <option disabled>Select status</option>
                        <option defaultValue={Status.DRAFT}>{(Status?.DRAFT).charAt(0).toLocaleUpperCase() + (Status.DRAFT).slice(1, Status.DRAFT.length)}</option>
                        <option value={Status.PUBLISHED}>{(Status?.PUBLISHED).charAt(0).toLocaleUpperCase() + (Status.PUBLISHED).slice(1, Status.PUBLISHED.length)}</option>
                    </select>
                    {formik.errors.status && formik.touched.status && (
                        <div className="invalid-feedback">
                            <small className="text-red-600">{formik.errors.status}</small>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="conent" className="block mb-2 text-md font-normal text-gray-900">Content</label>
                    <div className="border border-gray-600  rounded-md">
                        <Tiptap value={formik.values.content} onChange={(content) => void formik.setFieldValue("content", content)} />
                    </div>
                    {formik.errors.content && formik.touched.content && (
                        <div className="invalid-feedback">
                            <small className="text-red-600">{formik.errors.content}</small>
                        </div>
                    )}
                </div>
                <div>
                    <button type="submit" className="bg-blue-700 p-4 text-md w-[100px] text-white" disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</button>
                </div>
            </form>
        </>
    )
}